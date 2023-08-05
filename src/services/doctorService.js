require("dotenv").config;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Doctor } = require("../models");
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

    const existingDoc = await Doctor.findOne({ email });
    if (existingDoc) {
      return {
        status: false,
        message: "email already exist",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({
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
// Get Existing doctors data

const doctorsData = async (params) =>{
  try {
    const {email} = params;

    const currentDoctor = await DoctorModel.findOne({email});
    const data = globalFunctions.dataStripper(currentDoctor)
    if(currentDoctor){
      return{
        status: true,
        message: "Found Doctors data",
        data
      }
    }
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("doctorsData")
    }
    
  }
}

// Updatting Doctors Data
const doctorsUpdate = async (params) => {
  try {
    const {Name, Phone, Email, Gender, id} = params;

    const existingDoctor = await DoctorModel.findOne({_id: id})

    existingDoctor.name = Name,
    existingDoctor.phone = Phone,
    existingDoctor.email = Email,
    existingDoctor.gender = Gender,

    await existingDoctor.save();

    const data = globalFunctions.dataStripper(existingDoctor);

    return {
      status: true,
      message: "successfully updated",
      existingDoctor,
      data
    }
    
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("doctorsUpdate")
    }
    
  }

}

const doctorsDelete = async (params) =>{
  try {
    const {id} = params;

    const deleteDoctor = await DoctorModel.findByIdAndDelete({_id: id});

    if(!deleteDoctor){
      return {
        status: false,
        message: "No record found"
      }
    }
    
    return {
      status: true,
      message: "Doctor successfully deleted"
    }
    
  } catch (error) {
    return {
      status: false,
      message: globalFunctions.dataStripper("doctorsdelete")
    }
    
  }
}
module.exports = {
  doctorsSignup,
  doctorsSignin,
  doctorsUpdate,
  doctorsData,
  doctorsDelete
};
