const Customer = require('../models/customersModel');
const catchAsync = require('../utils/catchAsync');

exports.getAll = catchAsync(async(req, res, next) => {
    const customers = await Customer.find({userId: req.user._id});

    res.status(200).json({
        status: "success",
        data: customers
    })
});
exports.createOne = catchAsync(async(req, res, next) => {
    req.body.userId = req.user._id;
    const newCustomer = await Customer.create(req.body);

    res.status(201).json({
        status: "success",
        data: newCustomer
    })
});
exports.updateOne = catchAsync(async(req, res, next) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: updatedCustomer
    })
});
exports.deleteOne = catchAsync(async(req, res, next) => {
    const deletedCustomer = await Customer.findByIdAndDelete(req.query.id);

    res.status(204).json({
        status: "success",
        data: deletedCustomer
    })

});