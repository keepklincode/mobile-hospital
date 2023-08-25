const {response} = require("../helpers");
const appointment = require("../services/appointmentServices");

const createAppointment =  async (req, res) =>{ 
    const data = await appointment.createAppointment(req.form);
    return response(res, data)
};

const getAvailableDoctors = async (req, res) => {
    const data = await appointment.getAvailableDoctors(req.form);
    return response(res, data)
}
const bookedAppointment = async (req, res) => {
    const data = await appointment.bookedAppointment(res.form);
    return response(res, data)
}

module.exports = {
    createAppointment,
    getAvailableDoctors,
    bookedAppointment
}