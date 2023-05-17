const PhoneNumberModel = require('../models/phoneNumberModel');
const catchAsync = require('../utils/catchAsync');

exports.addPhoneNumber = catchAsync(async (req, res, next) => {
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
