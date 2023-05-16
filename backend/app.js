const express = require('express');

const userRouter = require('./routes/userRoutes');
const administrationRouter = require('./routes/administrationRoutes')
const CustomError = require('./utils/customError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json())

app.get('/api', (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "Backend message from api"
    })
});


app.use('/api/users', userRouter);

app.use('/api/administration', administrationRouter);

app.all('*', (req, res, next) => {
    const err = new CustomError(`C'ant find ${req.originalUrl} on this server`, 404);
    next(err);
});

//Global error handle
app.use(globalErrorHandler);

module.exports = app;