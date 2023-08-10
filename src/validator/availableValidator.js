const Joi = require("joi");

module.exports = {
  availableDr: {
        availableDate: Joi.date().required(),
        availableStartTime: Joi.string().required(),
        availableEndTime: Joi.string().required()
  },
  deleteAppointment: {
    id: Joi.string()
  }
};
