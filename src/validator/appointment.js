const Joi = require("joi");

module.exports = {
    createAppointment: {
        appointmentDate: Joi.date().required(),
        appointmentStartTime: Joi.string().required(),
        appointmentEndTime: Joi.string().required(),
        doctorsId: Joi.string().required(),
    },

    getAvailableDoctors: {
        id: Joi.string()
    },
    bookedAppointment: {
        id: Joi.string
    },

    checkAppointmentVacancy: {
        appointmentDate: Joi.date().required(),
        appointmentStartTime: Joi.string().required(),
        appointmentEndTime: Joi.string().required(),
        doctorsId: Joi.string().required(),
    },
}