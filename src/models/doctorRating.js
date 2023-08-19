const mongoose = require("mongoose");

const doctorRatingSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    rating: { 
        type: Number,
        min: 1,
        max: 5
    },
});

const DoctorRating = mongoose.model("DoctorRating", doctorRatingSchema);

module.exports = DoctorRating;