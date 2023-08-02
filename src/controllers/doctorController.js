const {response} = require("../helpers");
const doctorService = require("../services/doctorService");

const doctorsSignup = async (req, res) =>{
    const data = await doctorService.doctorsSignup(req.form);
    return response (res, data)
};

const doctorsSignin = async (req, res) => {
    const data = await doctorService.doctorsSignin(req.form);
    return response (res, data)
}

module.exports = {
    doctorsSignup,
    doctorsSignin
}