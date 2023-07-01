const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { response } = require("../helpers");

module.exports = (obj) => {
  
  return (req, res, next) => {
    
    const schema = Joi.object().keys(obj).required().unknown(false);
    let loggedInUser;

    if (req.headers.authorization){
      const token  = req.headers.authorization;
      
      
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return response(res, { status: false, message: "unauthorized access" });
        }
  
        loggedInUser = user;
      });
      
    }
  
    const value = req.method == "GET" ? req.query : req.body;
    const { error, value: vars } = schema.validate(value);

    if (error) {
      return response(res, { status: false, message: error.message });
    }

    req.form = {...vars, ...loggedInUser};
    next();
  };
};
