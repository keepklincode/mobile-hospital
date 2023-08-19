const Joi = require("joi");
module.exports = {
    rateDoctor: {
        doctorId: Joi.string().required(),
        rating: Joi.number().required()
    }

}