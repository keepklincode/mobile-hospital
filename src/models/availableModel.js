const mongoose = require("mongoose");

const availableSchema = new mongoose.Schema({
  
  doctorsId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  availableDate: {
    type: String,
    required: true,
  },
  availableStartTime: {
    type: String,
    required: true,
  },
  availableEndTime: {
    type: String,
    required: true,
  },
  // Other appointment-related fields
});

const Available = mongoose.model("Available", availableSchema);

module.exports = Available;