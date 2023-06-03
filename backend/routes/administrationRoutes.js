const express = require('express');

const administrationController = require("../controllers/administrationController");
const authenticationConroller = require('../controllers/authenticationConroller');

const router = express.Router();

router.use(authenticationConroller.protect, authenticationConroller.restrictTo("admin"));

router.route('/signupPhoneNumbers')
    .get(administrationController.getAllPhoneNumbers)
    .post(administrationController.addPhoneNumber)
    .delete(administrationController.deletePhoneNumber);

module.exports = router;