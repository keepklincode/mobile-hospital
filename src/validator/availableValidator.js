const Joi = require("joi");

module.exports = {
  availableDr: {
        availableDate: Joi.string().required(),
        availableStartTime: Joi.string().required(),
        availableEndTime: Joi.string().required()
  },
  deleteAppointment: {
    id: Joi.string()
  }
};
