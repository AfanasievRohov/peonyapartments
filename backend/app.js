const express = require('express');

const app = express();

app.get('/api', (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: "Backend message from api"
    })
});

module.exports = app;