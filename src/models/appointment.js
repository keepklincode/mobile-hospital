const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  doctorsId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  appointmentStartTime: {
    type: String,
    required: true,
  },
  appointmentEndTime: {
    type: String,
    required: true,
  },
  // Other appointment-related fields
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
