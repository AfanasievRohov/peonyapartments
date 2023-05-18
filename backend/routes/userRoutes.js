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

router.use(authenticationConroller.protect) // we start authenticationConroller.protect to protect all middlewares below 
// if user is not authinticated then middlewares below won`t be called

router.patch('/updateMyPassword', authenticationConroller.updatePassword)

module.exports = router;