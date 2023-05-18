const express = require('express');
const customersNotesController = require('../controllers/customersNotesController');
const authenticationConroller = require('../controllers/authenticationConroller');

const router = express.Router();

router.use(authenticationConroller.protect);

router.route('/')
    .get(customersNotesController.getAll)
    .post(customersNotesController.createOne)
    .patch(customersNotesController.updateOne)
    .delete(customersNotesController.deleteOne);

module.exports = router;