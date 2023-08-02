const Joi = require("joi");

module.exports = {
    doctorsSignup: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.number().required(),
        gender: Joi.string().required(),
        password: Joi.string().required(),
        passwordConfirm: Joi.string().required()
    },

    doctorsSignin: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}