const {response} = require("../helpers");
const doctorService = require("../services/doctorService");

const doctorsSignup = async (req, res) =>{
    const data = await doctorService.doctorsSignup(req.form);
    return response (res, data)
}

module.exports = {
    doctorsSignup
}