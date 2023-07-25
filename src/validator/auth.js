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

    onboarding: {
      gender: Joi.string().required(),
      patientId: Joi.number().required(),
  },

  userData: {
    id: Joi.string()
    
},

updateUser: {
  Name: Joi.string(),
  Phone: Joi.number(),
  Email: Joi.string(),
  PatientId: Joi.number()

},

deleteUser: {
  id: Joi.string()
}

}