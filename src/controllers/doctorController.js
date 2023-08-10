const {response} = require("../helpers");
const doctorService = require("../services/doctorService");

const doctorsSignup = async (req, res) =>{
    const data = await doctorService.doctorsSignup(req.form);
    return response (res, data);
};

const doctorsSignin = async (req, res) => {
    const data = await doctorService.doctorsSignin(req.form);
    return response (res, data);
};

const doctorsUpdate = async (req, res) => {
    const data = await doctorService.doctorsUpdate(req.form);
    return response (res, data);
};

const doctorsData = async (req, res) => {
    const data = await doctorService.doctorsData(req.form)
    return response (res, data);
};

const doctorsDelete = async (req, res) =>{
    const data = await doctorService.doctorsDelete(req.form);
    return response (res, data);
};

const getAllDoctors = async (req, res) =>{
    const data = await doctorService.getAllDoctors(req.form);
    return response (res, data);
}
module.exports = {
    getAllDoctors,
    doctorsSignup,
    doctorsSignin,
    doctorsUpdate,
    doctorsData,
    doctorsDelete
}