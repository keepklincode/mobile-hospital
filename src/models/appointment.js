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
    type: Date,
    required: true,
    format: "YYYY-MM-DD"
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
