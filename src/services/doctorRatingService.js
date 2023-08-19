const {Doctor, DoctorRating} = require("../models");

const {constants} =require("../configs")

const rateDoctor = async (params) => {
    try {
        const {doctorId, rating} = params;

    // Check if Doctor exist
    const doctor = await Doctor.findOne({_id: doctorId});
    if(!doctor){
        return{
            status: false,
            messsage: "doctor not found"
        }
    }
   
    // Add the rating to the doctor's ratings
    if (rating < 1 || rating > 5) {
        return {
            status: false,
            message: "rating cannot be less than 1 or more than 5"
        }
    }
    const doctorRating = await DoctorRating.create({
        doctorId: doctor.id,
        rating,
    
    });
    return {
        status: true,
        message: "Doctor's performance rated succesfully",
        doctorRating
    }
    
    } catch (error) {
        console.log(error)
        return{
            status: false,
            message: constants.SERVER_ERROR("rateDoctor")
        }
        
    }

};




module.exports = {
    rateDoctor
}