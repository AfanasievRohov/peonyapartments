const mongoose = require('mongoose');

const phoneNumberSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Please provide phone number"],
        minlength: [10, "Phone number should be at least 10 characters long"],
        maxlength: [13, "Phone number should less than 13 characters long"],
        set: (val) => {
            return (val.length < 10) ? "error" : "+380" + val.slice(-9);
        }
    }
});

const PhoneNumber = new mongoose.model("PhoneNumber", phoneNumberSchema);

module.exports = PhoneNumber;
