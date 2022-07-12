const jwt = require('jsonwebtoken')
const { validatetoken } = require('./jwt')

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // jwt.verify(token, process.env.SECRET_JWT, (err, verifyToken) => {
        try {
            const id = validatetoken(token)
            req.id = id;
            next();
        }
        catch (e) {
            if (e) {
                return res.sendStatus(403);
            }
        }


    } else {
        res.sendStatus(401);
    }
};
module.exports = { authJWT }