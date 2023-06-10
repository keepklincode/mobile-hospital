const Joi = require("joi");

module.exports = {
    signup: {
    fullName: Joi.string().required(),
    hospital: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }, 

    signin: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
}