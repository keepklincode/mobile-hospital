const { Appointment } = require("../models");
const { Auth } = require("../models");
const { constants } = require("../configs");
const { Available } = require("../models");
const { Doctor } = require("../models");

const createAppointment = async (params) => {
  try {
    const {
      id,
      doctorsId,
      appointmentDate,
      appointmentStartTime,
      appointmentEndTime,
    } = params;

    const checkDr = await Doctor.findOne({ _id: doctorsId });
    if (!checkDr) {
      return {
        status: false,
        message: "Invalid doctor's Id",
      };
    }

    const appointmentDayOfWeek = new Date(appointmentDate).getDay();
    if (appointmentDayOfWeek === 0 || appointmentDayOfWeek === 6) {
      return {
        status: false,
        message: "Appointments are not available on weekends",
      };
    }
    if (appointmentStartTime < "08:00" || appointmentEndTime > "17:30") {
      return {
        status: false,
        message: "Cannot make appointment within this Hour",
      };
    }
    const checkAvailableDr = await Available.findOne({
      doctorsId: doctorsId,
      availableDate: appointmentDate,
      availableStartTime: appointmentStartTime,
      availableEndTime: appointmentEndTime,
    });

    if (checkAvailableDr) {
      return {
        status: false,
        message: "Doctor has already been booked",
      };
    }

    const newAppointment = await Appointment.create({
      userId: id,
      doctorsId: checkDr.id,
      appointmentDate,
      appointmentStartTime,
      appointmentEndTime,
    });
    // console.log(appointment);

    await Available.create({
      doctorsId: doctorsId,
      availableDate: appointmentDate,
      availableStartTime: appointmentStartTime,
      availableEndTime: appointmentEndTime,
    });
    return {
      status: true,
      message: "Appointment successfully created",
      data: newAppointment,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("createAppointment"),
    };
  }
};

const getAvailableDoctors = async () => {
  try {
    const availableTime = [
      { availableDate: "2023-08-18", availableStartTime: "08:00", availableEndTime: "08:30"},
      { availableDate: "2023-08-18", availableStartTime: "08:30", availableEndTime: "09:00"},
      { availableDate: "2023-08-18", availableStartTime: "09:00", availableEndTime: "09:30"},
      { availableDate: "2023-08-18", availableStartTime: "09:30", availableEndTime: "10:00"},
      { availableDate: "2023-08-18", availableStartTime: "10:30", availableEndTime: "11:00"},
    ];

    // Retrieve all available appointments from the database
    const availableAppointments = await Available.find();
    const doctors = await Doctor.find();

     const doctorsWithAvailableTime = doctors.map((doctor) => {
      const availableSlots = availableTime.filter((timeSlot) => {
        const matchingAppointment = availableAppointments.find((appointment) => {
          const formattedDate = new Date(appointment.availableDate)
            .toISOString()
            .substr(0, 10);
          return (
            formattedDate === timeSlot.availableDate &&
            appointment.availableStartTime === timeSlot.availableStartTime &&
            appointment.availableEndTime === timeSlot.availableEndTime &&
            appointment.doctorsId.equals(doctor._id)
          );
        });

        return !matchingAppointment;
      });

      return {
        ...doctor.toObject(),
        availableSlots,
      };
    });

    return {
      status: true,
      message: "Available doctors retrieved successfully",
      // availableTime: availableSlots,
      doctorsWithAvailableTime,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("getAvailableDoctors"),
    };
  }
};

const bookedAppointment = async () => {
  try {
    const booked = await Available.find()
    if (booked){
      return{
        status: true,
      message: "Retrived booked appointment",
      booked
      }
    };

    
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("bookedAppointment"),
    };
    
  }
}

module.exports = {
  createAppointment,
  getAvailableDoctors,
  bookedAppointment
};
