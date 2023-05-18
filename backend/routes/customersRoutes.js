const express = require('express');
const customerController = require('../controllers/customerController');
const authenticationConroller = require('../controllers/authenticationConroller');

const router = express.Router();

router.use(authenticationConroller.protect);

router.route('/')
    .get(customerController.getAll)
    .post(customerController.createOne)
    .patch(customerController.updateOne)
    .delete(customerController.deleteOne);

module.exports = router;