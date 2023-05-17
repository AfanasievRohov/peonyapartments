const express = require('express');

const apartmentsController = require('../controllers/apartmentsController');
const authenticationConroller = require('../controllers/authenticationConroller');

const router = express.Router();

router.use(authenticationConroller.protect);

router.route('/:id?')
    .get(apartmentsController.getAll)
    .patch(apartmentsController.updateOneApartment);

router.use(authenticationConroller.restrictTo("admin"));

router.route('/edit')
    .post(apartmentsController.addNewApartment)
    .delete(apartmentsController.deleteOneApartment);

module.exports = router;
