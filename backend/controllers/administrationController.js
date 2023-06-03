const PhoneNumberModel = require('../models/phoneNumberModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllPhoneNumbers = catchAsync(async (req, res, next) => {
    const phoneNumbers = await PhoneNumberModel.find({workspace: req.user._id});

    res.status(200).json({
        status: "success",
        data: phoneNumbers
    });
})

exports.addPhoneNumber = catchAsync(async (req, res, next) => {
    req.body.workspace = req.user._id;
    const newNumber = await PhoneNumberModel.create(req.body);

    res.status(201).json({
        status: "success",
        data: newNumber
    });
});

exports.deletePhoneNumber = catchAsync(async (req, res, next) => {
    const deletedNumber = await PhoneNumberModel.findByIdAndDelete(req.body);

    if (!deletedNumber) {
        return next(new AppCustomError(`No document find with id :${req.body.id}`, 404));
    }

    res.status(204).json({
        status: "success",
        data: deletedNumber
    });
});
