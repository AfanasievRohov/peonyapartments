const express = require('express');

const authenticationConroller = require('../controllers/authenticationConroller');

const router = express.Router();

router.route('/signup')
    .post(authenticationConroller.signup);

router.route('/login')
    .post(authenticationConroller.login);

router.route('/logout')
    .post(authenticationConroller.logout);

router.post('/forgotPassword', authenticationConroller.forgotPassword)
router.patch('/resetPassword/:token', authenticationConroller.resetPassword)

module.exports = router;