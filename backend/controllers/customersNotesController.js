const CustomersNotes = require('../models/customersNotesModel');
const catchAsync = require('../utils/catchAsync');

exports.getAll = catchAsync(async(req, res, next) => {
    const customersNotes = await CustomersNotes.find({userId: req.user._id});

    res.status(200).json({
        status: "success",
        data: customersNotes
    })
});
exports.createOne = catchAsync(async(req, res, next) => {
    req.body.userId = req.user._id;
    const newCustomerNote = await CustomersNotes.create(req.body);

    res.status(201).json({
        status: "success",
        data: newCustomerNote
    })
});
exports.updateOne = catchAsync(async(req, res, next) => {
    const updatedCustomerNote = await CustomersNotes.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: updatedCustomerNote
    })
});
exports.deleteOne = catchAsync(async(req, res, next) => {
    const deletedCustomerNote = await CustomersNotes.findByIdAndDelete(req.query.id);

    res.status(204).json({
        status: "success",
        data: deletedCustomerNote
    })

});