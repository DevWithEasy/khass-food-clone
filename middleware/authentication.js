const jwt =require ('jsonwebtoken');
const AppError =require ("../utils/AppError");

const authenticated = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        if (!token) {
            return next(new AppError(401, 'Authentication failed.'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                next(new AppError(401, 'Authentication failed.'))
            } else {
                req.user = decode.id
                next()
            }
        })

    } catch (error) {
        next(new AppError(500, error.message))
    }
}

module.exports = authenticated