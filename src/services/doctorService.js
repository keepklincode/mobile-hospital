require("dotenv").config;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DoctorModel } = require("../models");
const { constants } = require("../configs");
const { globalFunctions } = require("../helpers");

const doctorsSignup = async (params) => {
  try {
    const { name, email, phone, gender, password, passwordConfirm} = params;

    if (password !== passwordConfirm) {
      return {
        status: false,
        message: "password do not match",
      };
    }

    const existingDoc = await DoctorModel.findOne({ email });
    if (existingDoc) {
      return {
        status: false,
        message: "email already exist",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await DoctorModel.create({
      name,
      email,
      phone,
      gender,
      password: hashedPassword,
    });

    const data = globalFunctions.dataStripper(newDoctor);

    const secretKey = process.env.SECRET;
    const token = jwt.sign(
      {
        id: newDoctor.id,
        email: newDoctor.email,
        name: newDoctor.name,
      },
      secretKey
    );

    if (newDoctor) {
      return {
        status: true,
        message: "successfully created",
        token,
        data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("doctorSignup"),
    };
  }
};

const doctorsSignin = async (params) => {
  try {
    const {email, password} = params;

    const existingUser = await DoctorModel.findOne({email});
    console.log(existingUser)

    if(!existingUser){{
      return {
        status: false,
        message: "invalide email"
      }
    }}

    const passwordMatch = await bcrypt.compare(password, existingUser.password); 
    console.log(passwordMatch)
    console.log(password)
    if (!passwordMatch) {
      return {
        status: false,
        message: "invalid password"
      }
    }

    const data = globalFunctions.dataStripper(existingUser);
    const secretKey = process.env.SECRET;

    const token = jwt.sign(
      {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name
    },
    secretKey
    );
    console.log(token);

    return {
      status: true,
      message: "successfully signin",
      token,
      data
    }
    
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("doctorsSignin")
    }
    
  }
}

module.exports = {
  doctorsSignup,
  doctorsSignin
};
