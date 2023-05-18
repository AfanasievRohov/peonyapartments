const crypto = require('crypto');
const User = require('../models/userModel');
const PhoneNumber = require('../models/phoneNumberModel');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');
const Email = require('./../utils/email');

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
    const candidatePhoneNumber = "+380" + req.body.phoneNum.slice(-9);
    const canSignup = await PhoneNumber.find({phoneNumber: candidatePhoneNumber});

    if(!canSignup.length) {
        return next(new CustomError('You cannot login, please talk to administrator', 400));
    }

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

exports.login = catchAsync(async (req, res, next) => {
    //Get email and password from req.body to be sure both present
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new CustomError('Please provide email and password', 400));
    }

    //Find user with that email, and if it dosn't exist throw error
    const user = await User.findOne({email}).select("+password");
    let correctPassword = user ? await user.correctPassword(password, user.password) : null;

    if(!user || !correctPassword) {
        return next(new CustomError('Incorrect email or password', 401));
    }

    //Create and send token
    createAndSendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
    const cookieOptions = {
        expires: new Date(Date.now() + (10 * 1000)),
        httpOnly: true
    };

    res.cookie("jwt", "logged out", cookieOptions);

    res.status(200).json({
        status: "succes",
        data: null
    });
}

exports.protect = catchAsync(async (req, res, next) => {
    //Getting token and check if exist
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    //Validate verification token with jwt module
    if (!token) {
        return next(new CustomError('You are not logged in, please log in to get access', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //If Verified check if user still exist
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return next(new CustomError("The user belonging to this token does not longer exist", 401))
    }

    //Check if user changed password after jwt token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new CustomError("User recently changed password. Please log", 401));
    }

    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new CustomError("You do not have permission to perform this action", 403))
        }

        next()
    }
};

exports.forgotPassword = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new CustomError('There is no user with that email!', 404))
    }

    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false }) // this turns off all validators

    try {
        const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`
        await new Email(user, resetURL).sendPasswordReset()

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        await user.save({ validateBeforeSave: false })

        return next(new CustomError('There was an error sending email! Try again later', 500))
    }

})


exports.resetPassword = catchAsync(async (req, res, next) => {
    //1) get user based on the token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })

    //2) if token has not expired and there is the user - set the password
    if (!user) {
        return next(new CustomError('Token is not valid or has expired', 400))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    //3) update changed pass

    //4) log the user in, send JWT
    createAndSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    //1) get user from the collection
    const user = await User.findById(req.user.id).select('+password') // "+" is to get password visible

    //2) check if posted password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new CustomError('Password is incorrect', 401))
    }
    //3) update the password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()
    //4) log in user, send JWT
    createAndSendToken(user, 200, res)
})