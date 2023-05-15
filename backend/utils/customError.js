class CustomError extends Error {
    constructor(errorMessage, errorStatusCode) {
        super(errorMessage);

        this.statusCode = errorStatusCode;
        this.status = '${errorStatusCode}'.startsWith(4) ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }

}

module.exports = CustomError;