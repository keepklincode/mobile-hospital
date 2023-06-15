const Joi = require("joi");

module.exports = {
    signup: {
    name: Joi.string().required(),
    hospital: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }, 

    signin: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
}