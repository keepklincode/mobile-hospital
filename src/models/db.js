const mongoose = require("mongoose");


const userSchema = new mongoose.schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hospital: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = mongosose.model("User", userSchema);

module.exports = User;