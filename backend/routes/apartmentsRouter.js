const express = require('express');

const apartmentsController = require('../controllers/apartmentsController');
const router = express.Router();

router
    .route('/')
    .get(apartmentsController.getAll)
;

module.exports = router;
