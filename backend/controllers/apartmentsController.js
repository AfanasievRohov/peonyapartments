const Apartment = require('../models/apartmentModel');
const catchAsync = require('../utils/catchAsync');

exports.getAll = catchAsync(async (req, res) => {
    const apartments = await Apartment.find();

    res.status(200).json({
        error: false,
        data: {
            apartments
        }
    });
});

exports.updateOneApartment = catchAsync(async (req, res) => {
    const apartments = await Apartment.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            apartments
        }
    });
});

exports.deleteOneApartment = catchAsync(async (req, res) => {
    const deletedApartment = await Apartment.findByIdAndDelete(req.body);

    res.status(204).json({
        status: "success",
        data: deletedApartment
    })
});

exports.addNewApartment = catchAsync(async (req, res) => {
    const newApartment = await Apartment.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newApartment
    });
});