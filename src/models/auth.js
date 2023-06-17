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
    dob: {
        type: String,
        required: [true, "DOB is needed"]
    },
    password:{
        type: String,
        required: [true, "insert your password"]
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return value === this.password;
          },
          message: 'Password confirmation does not match the password',
        },
      },
});


const User = mongoose.model("User", userSchema);

module.exports = User;