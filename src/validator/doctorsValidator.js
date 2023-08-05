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
    },

    doctorsUpdate: {
        Name: Joi.string().required(),
        Email: Joi.string().required(),
        Phone: Joi.number().required(),
        Gender: Joi.string().required(),
    },

    doctorsData: {
        id: Joi.string()
    },

    doctorsDelete: {
        id: Joi.string()
    }
}