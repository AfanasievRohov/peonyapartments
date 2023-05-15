const mongoose = require('mongoose');

const apartmentSchema = mongoose.Schema({
    address: {
        type: String,
        required: [true, "Apartament must have a address"]
    },
    pets: {
        type: Boolean,
        required: [true, "Apartament must have a pets field"]
    },
    parking: {
        type: Boolean,
        required: [true, "Apartament must have a parking field"]
    },
    floor: {
        type: Number,
        required: [true, "Apartament must have a floor field"]
    },
    price: {
        type: Number,
        required: [true, "Apartament must have a price"]
    },
    rooms:{
        type: Number,
        required: [true, "Apartament must have a rooms number"]
    },

});

const Apartment = new mongoose.model("Apartment", apartmentSchema);


module.exports = Apartment;