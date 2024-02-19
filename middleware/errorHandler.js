const AppError =require ('../utils/AppError');
const errorHandler = (app) => {
    app.use((err, req, res, next) => {
        console.log(err.stack)
        const status = err instanceof AppError ? err.statusCode : 500;
        const message = err.message || 'Internal sever error'
        return res.status(status).json({
            success : false,
            status : status,
            message: message 
        })
    })
}

module.exports = errorHandler