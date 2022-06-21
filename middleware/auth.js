const { validatetoken } = require('../BL/jwt')
const { readOne } = require('../DL/controllers/userController')

async function auth(req, res, next) {
    try {
        const token = req.headers.authorization
        const decode = validatetoken(token)
        const eUser = await readOne({ _id: decode.id })
        next()
        if (!eUser) throw ""
    } catch (error) {
        res.status(503).send({ message: "not authorized user" })
    }

}
module.exports = auth