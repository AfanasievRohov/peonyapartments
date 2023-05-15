const mongoose = require('mongoose');
const validator = require("validator");

const userShcema = new mongoose.Schema({
    phoneNum: {
        type: String,
        required: [true, "A user must have a phone number"],
    },
    name: {
        type: String,
        required: [true, "A user must have a name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "A user must have a email"],
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee'
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: [8, "A password must be at least 8 char long"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: [8, "A password must be at least 8 char long"],
        validate: {
            validator: function (el) {
                return this.password === el;
            },
            message: "Passwords are not the same"
        }
    }
});

const User = new mongoose.model("User", userShcema);

module.exports = User;
