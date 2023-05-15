const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const validator = require("validator"); maybe will use this package on email validation

const userSchema = new mongoose.Schema({
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

//Query middleware
userSchema.pre('save', async function (next) {
    // Only run this function if password was moddified (not on other update functions)
    if (!this.isModified('password')) return next();
    // Hash password with strength of 12
    this.password = await bcrypt.hash(this.password, 12);
    //remove the confirm field
    this.passwordConfirm = undefined;
});

//Methods
userSchema.methods.correctPassword = async (candidatePassword, encryptedPassword) => {
    return await bcrypt.compare(candidatePassword, encryptedPassword);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
