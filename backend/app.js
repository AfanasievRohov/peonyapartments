const express = require('express');

const CustomError = require('./utils/customError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.get('/api', (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "Backend message from api"
    })
});

app.all('*', (req, res, next) => {
    const err = new CustomError(`C'ant find ${req.originalUrl} on this server`, 404);
    next(err);
});

//Global error handle
app.use(globalErrorHandler);

module.exports = app;