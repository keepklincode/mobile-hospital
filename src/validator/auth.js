const Joi = require("joi");

module.exports = {
    signup: {
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().required(),
    dob:  Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
  }, 

    signin: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    },

    unboarding: {
      gender: Joi.string().required(),
      patientId: Joi.string().required(),
  },

}