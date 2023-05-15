const express = require('express');

const authenticationConroller = require('../controllers/authenticationConroller');

const router = express.Router();

router.route('/signup')
    .post(authenticationConroller.signup);

module.exports = router;