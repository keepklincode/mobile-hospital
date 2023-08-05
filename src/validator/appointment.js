const Joi = require("joi");

module.exports = {
    createAppointment: {
        appointmentDate: Joi.string().required(),
        appointmentStartTime: Joi.string().required(),
        appointmentEndTime: Joi.string().required(),
        doctorId: Joi.string().required(),
    }
}