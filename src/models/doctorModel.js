const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Name is needed"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is needed"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    password:{
        type: String,
        required: [true, "insert your password"], 
    },
    gender: {
        type: String,
    }
});


const Doctor = mongoose.model("Doctor", userSchema);

module.exports = Doctor;