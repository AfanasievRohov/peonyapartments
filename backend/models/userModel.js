const mongoose = require('mongoose');
const crypto = require('crypto')
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
    },
    passwordsChangedAt: {
        type: Date
    },
    photo: {
        type: String,
        default: './users/default.jpg'
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
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

userSchema.pre('save', async function(next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordsChangedAt = Date.now() - 1000;

    next();
});

//Methods
userSchema.methods.correctPassword = async (candidatePassword, encryptedPassword) => {
    return await bcrypt.compare(candidatePassword, encryptedPassword);
};

userSchema.methods.changedPasswordAfter = function (timeStampJWT) {
    if (this.passwordsChangedAt) {
        const changedTimestamp = parseInt(this.passwordsChangedAt.getTime() / 1000, 10);
        return timeStampJWT < changedTimestamp;
    }

    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

   // console.log({ resetToken }, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
