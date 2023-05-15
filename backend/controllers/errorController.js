const sendErrorDev = (err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        stack: err.stack,
        message: err.message
    })
};

module.exports = (err, req, res, next) => {
    sendErrorDev(err, req, res);
};