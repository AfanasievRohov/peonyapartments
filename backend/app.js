const express = require('express');

// Routers
const apartmentsRouter = require('./routes/apartmentsRoutes');
const userRouter = require('./routes/userRoutes');
const administrationRouter = require('./routes/administrationRoutes');
const CustomError = require('./utils/customError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Middleware
app.use(express.json());

//Added only for test, can be deleted when front end created
app.get('/api', (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "Backend message from api"
    })
});

app.use('/api/apartments', apartmentsRouter);

app.use('/api/users', userRouter);

app.use('/api/administration', administrationRouter);

app.all('*', (req, res, next) => {
    const err = new CustomError(`C'ant find ${req.originalUrl} on this server`, 404);
    next(err);
});

//Global error handle
app.use(globalErrorHandler);

module.exports = app;
