const express = require('express');

const app = express();

// Routers
const apartmentsRouter = require('./routes/apartmentsRouter');

// Middleware
app.use(express.json());

app.get('/api', (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "Backend message from api"
    })
});

app.use('/api/apartments', apartmentsRouter);

module.exports = app;
