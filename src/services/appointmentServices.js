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
    const doctors = await Doctor.find();
    const availableAppointments = await Available.find();

    const doctorsWithAvailableTime = doctors.map((doctor) => {
      const bookedTimeSlots = availableAppointments
        .filter((appointment) => appointment.doctorsId.equals(doctor._id))
        .map((appointment) => ({
          availableStartTime: appointment.availableStartTime,
          availableEndTime: appointment.availableEndTime,
        }));

      // Calculate the availableTime based on doctor's working hours and interval
      const workingHours = { start: "07:00", end: "17:30" };
      const interval = 30; // in minutes

      const availableTime = [];

      let currentTime = workingHours.start;
      while (currentTime <= workingHours.end) {
        availableTime.push({
          availableDate: "2023-08-18", // You can replace this with dynamic dates
          availableStartTime: currentTime,
          availableEndTime: addMinutes(currentTime, interval),
        });
        currentTime = addMinutes(currentTime, interval);
      }

      const vacantTimeSlots = availableTime.filter((timeSlot) => {
        const isBooked = bookedTimeSlots.some(
          (bookedSlot) =>
            bookedSlot.availableStartTime === timeSlot.availableStartTime &&
            bookedSlot.availableEndTime === timeSlot.availableEndTime
        );

        return !isBooked;
      });

      return {
        ...doctor.toObject(),
        vacantTimeSlots,
      };
    });

    return {
      status: true,
      message: "Available doctors retrieved successfully",
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

// Function to add minutes to a given time
function addMinutes(time, minutes) {
  const [hours, mins] = time.split(":").map(Number);
  const newMins = (mins + minutes) % 60;
  const newHours = hours + Math.floor((mins + minutes) / 60);
  return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(
    2,
    "0"
  )}`;
}



const checkAppointmentVacancy = async (params) => {
  try {
    const {
      doctorsId,
      appointmentDate,
      appointmentStartTime,
      appointmentEndTime,
    } = params;

    const isAvailable = await Available.findOne({
      doctorsId: doctorsId,
      availableDate: appointmentDate,
      availableStartTime: appointmentStartTime,
      availableEndTime: appointmentEndTime,
    });
    
    const vacancy = {
      doctorsId,
      appointmentDate,
      appointmentStartTime,
      appointmentEndTime,
    }
    

    if (isAvailable) {
      return {
        status: false,
        message: "Doctor has already been booked",
      };
    }

    return {
      status: true,
      message: "Doctor is free at this moment",
      vacancy
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("checkAppointmentVancancy"),
    };
  }
};


const bookedAppointment = async () => {
  try {
    const booked = await Available.find();
    if (booked) {
      return {
        status: true,
        message: "Retrived booked appointment",
        booked,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("bookedAppointment"),
    };
  }
};

module.exports = {
  checkAppointmentVacancy,
  createAppointment,
  getAvailableDoctors,
  bookedAppointment,
};
