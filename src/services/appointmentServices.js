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
const getAvailableDoctors = async (params) => {

  try {
    const {
      appointmentDate,
      appointmentStartTime,
      appointmentEndTime,
    } = params;

    const availableTime = [
      {availableDateDate: "2023-08-18", availableStartTimeStartTime: "08:00", availableEndTime: "08:30"},
      {availableDateDate: "2023-08-18", availableStartTimeStartTime: "08:30", availableEndTime: "09:00"},
      {availableDateDate: "2023-08-18", availableStartTimeStartTime: "09:00", availableEndTime: "09:30"},
      {availableDateDate: "2023-08-18", availableStartTimeStartTime: "09:30", availableEndTime: "10:00"},


     ];
    // const availableDoctor = await Available.find({
    //  const 
    // })

    // const availableDoctors = await Available.find({
    //   availableDate: appointmentDate,
    //   availableStartTime: appointmentStartTime ,
    //   availableEndTime: appointmentEndTime,
    // });
    

 
    // return {
    //   status: true,
    //   message: "Available doctors retrieved successfully",
    //   data: availableDoctors,
    //   availableTime
    // };
    const availableDoctors = await Available.find({
      availableDate: appointmentDate,
      availableStartTime: { $ne: appointmentStartTime },
      availableEndTime: { $ne: appointmentEndTime },
    });

    // Filter availableTime slots that are not contained in availableDoctors
    const freeTimeSlots = availableTime.filter((timeSlot) => {
      return !availableDoctors.some((doctor) => {
        return (
          doctor.availableDate === timeSlot.availableDate &&
          doctor.availableStartTime === timeSlot.availableStartTime &&
          doctor.availableEndTime === timeSlot.availableEndTime
        );
      });
    });

    return {
      status: true,
      message: "Available doctors retrieved successfully",
      data: freeTimeSlots,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("getAvailableDoctors"),
    };
  }
};

module.exports = {
  createAppointment,
  getAvailableDoctors,
};
