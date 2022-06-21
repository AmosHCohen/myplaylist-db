const jwt = require('jsonwebtoken')
const secret = "1234"
function createToken(id) {
    return jwt.sign({ id }, secret, { expiresIn: "1h" })
}
function validatetoken(token) {
    return jwt.verify(token, secret)

}

module.exports = { createToken, validatetoken }