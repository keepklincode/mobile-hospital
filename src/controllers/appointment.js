const {response} = require("../helpers");
const appointment = require("../services/appointmentServices");

const createAppointment =  async (req, res) =>{ 
    const data = await appointment.createAppointment(req.form);
    return response(res, data)
}


module.exports = {
    createAppointment
}