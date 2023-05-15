const Apartment = require('../models/apartmentModel');

const getAll = async (req, res) => {
    try {
        const apartments = await Apartment.find();

        res.status(200).json({
            error: false,
            data: {
                apartments
            }
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        });
    }
};

module.exports.getAll = getAll;
