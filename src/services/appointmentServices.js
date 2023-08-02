const { Appointment } = require("../models");
const { Auth } = require("../models");
const { constants } = require("../configs");

const createAppointment = async (params) => {
  try {
    const { id, appointmentDate, appointmentTime } = params;
    console.log(params)


    const appointment = await Appointment.create({
        userId: id,
        appointmentDate,
        appointmentTime,
    });
    // console.log(appointment);
    return {
      status: true,
      message: "Appointment successfully created",
      data: appointment,
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
