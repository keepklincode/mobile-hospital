const Joi = require("joi");

module.exports = {
    createAppointment: {
        appointmentDate: Joi.date().required(),
        appointmentTime: Joi.string().required()
    }
}