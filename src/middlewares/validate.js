const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { response } = require("../helpers");

const publicEndPoint = [
  "/signin",
  "/signup",
  "/doctorsSignup",
  "/doctorsSignin",
  "/getAvailableDoctors"
  // "/getAllUser"
]

module.exports = (obj) => {
  return (req, res, next) => {
    
    const schema = Joi.object().keys(obj).required().unknown(false);
    let loggedInUser; 
    // console.log(req.url)
    if (req.headers.authorization === undefined && !publicEndPoint.includes(req.url)) {
      return response(res, { status: false, message: "unauthorized access" });
    }
  
    if (req.headers.authorization) {
      const token = req.headers.authorization;

      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          loggedInUser = {};
          // return response(res, { status: false, message: "unauthorized access" });
        }

        loggedInUser = user;
      });
    }

    if (req.headers.authorization && loggedInUser === undefined) {
      return response(res, { status: false, message: "unauthorized access" });
    }

    const value = req.method == "GET" ? req.query : req.body;
    const { error, value: vars } = schema.validate(value);

    if (error) {
      console.log(error);
      return response(res, { 
        status: false, message: error.message });
    }

    req.form = { ...vars, ...loggedInUser };
    next();
  };
};
