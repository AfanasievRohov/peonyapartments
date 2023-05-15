const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const createAndSendToken = (user, statusCode, res) => {
    let token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const cookieOptions = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 *60 * 60 * 1000)),
        httpOnly: true
    };

    // if (process.env.NODE_ENV === "production") cookieOptions.secure = true; //This thing blocked sending cookies if not secure (HTTPS)

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;
    res.status(statusCode).json({
        status: "succes",
        token,
        data: {
            user: user
        }
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        phoneNum: req.body.phoneNum,
        role: req.body.role, //This is bad practice, will be look into
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createAndSendToken(newUser, 201, res);
});
