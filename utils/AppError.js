class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
    }
}

module.exports =  AppError