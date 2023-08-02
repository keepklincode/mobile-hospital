const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId
},
  appointmentDate: { 
    type: Date,
    required: true 
},
  appointmentTime: {
    type: String,
    required: true
},
  // Other appointment-related fields
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;