const mongoose = require('mongoose');

const apartmentSchema = mongoose.Schema({
    workspace: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Admin Id should provide workspace"]
    },
    address: {
        type: String,
        required: [true, "Apartament must have a address"]
    },
    isActive: {
        type: Boolean,
        required: [true, "Apartament must have a active field"],
        default: false
    },
    isOccupied: {
        type: Boolean,
        required: [true, "Apartament must have a occupied field"],
        default: false
    },
    floor: {
        type: Number,
        required: [true, "Apartament must have a floor field"]
    },
    floorQty: {
        type: Number,
        required: [true, "Apartament must have a floor quantity field"]
    },
    priceMonth: {
        type: Number,
        required: [true, "Apartament must have a price"]
    },
    rooms:{
        type: Number,
        required: [true, "Apartament must have a rooms number"]
    },
    pets: {
        type: Boolean,
    },
    parking: {
        type: Boolean,
    },
    roomatesQty: {
        type: Number
    },
    occupied: {
        type: [Date]
    },
    photos: [String]
});

const Apartment = new mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
