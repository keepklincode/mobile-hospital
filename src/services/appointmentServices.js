const { Appointment } = require("../models");
const { Auth } = require("../models");
const { constants } = require("../configs");
const {Available} = require("../models");
const {Doctor} = require("../models")
const {availableServices} = require("../services/avaibleServices");

const createAppointment = async (params) => {
  try {
    const { id, doctorId, appointmentDate, appointmentStartTime, appointmentEndTime } = params;

    const checkDr = await Doctor.findOne({_id: doctorId});
    if  (!checkDr){
      return {
        status: false,
        message: "Invalid doctor's Id"
      }
    }
    const checkUser = await Auth.findOne({_id: id});
    if (!checkUser){
      return {
        status: false,
        message: "Invalid user's Id"
      }
    }
    const checkAvailableDr = await Available.findOne({
      doctorsId: doctorId,
      availableDate: appointmentDate,
      availableStartTime: appointmentStartTime,
      availableEndTime: appointmentEndTime
    });

    if (checkAvailableDr){
      return {
        status: false,
        message: "Doctor has already been booked"
      }
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
        doctorsId: doctorId,
        availableDate: appointmentDate,
        availableStartTime: appointmentStartTime,
        availableEndTime: appointmentEndTime

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

module.exports = {
  createAppointment,
};
