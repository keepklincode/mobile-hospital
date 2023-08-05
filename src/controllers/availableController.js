const availableServices = require("../services/avaibleServices");
const {response }= require("../helpers");

const availableDr = async (req, res) =>{
    const data = await availableServices.availableDr(req.form);
    return response(res, data);
}
const deleteAppointment = async (req, res) =>{
    const data = await availableServices.deleteAppointment(req.form);
    return response(res, data);
}

module.exports = {
    availableDr,
    deleteAppointment
}