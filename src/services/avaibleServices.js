require("dotenv").config;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DoctorModel } = require("../models");
const { Available } = require("../models");
const { constants } = require("../configs");

const availableDr = async (params) => {
  try {
    const { id, availableDate, availableStartTime, availableEndTime } = params;

    const available = await Available.create({
      doctorsId: id,
      availableDate,
      availableStartTime,
      availableEndTime,
    });
    return {
      status: true,
      message: "successful",
      available,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("availableDr"),
    };
  }
};

const deleteAppointment = async (params) =>{
  try {
    const {id} = params;
    const checkAvailable = await Available.findByIdAndDelete({_id: id});

    if (!checkAvailable){
      return {
        status: false,
        message: "Invalid Appointment Id"
      }
    }
     
    return {
      status: true,
      message: "Appointment successfully deleted"
    }

  } catch (error) {
    
  }
}

module.exports = {
  availableDr,
  deleteAppointment
};
