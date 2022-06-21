const userController = require('../DL/controllers/userController')
const { CreateToken, createToken } = require('./jwt')


exports.getAllUsers = async () => {
    const users = await userController.read({});
    if (users.length === 0) throw ({ code: 400, msg: "there is no users" })
    return users
}
exports.getUserById = async (id) => {
    if (!id) throw ({ code: 401, msg: "No data was sent" })
    const user = await userController.readOne({ _id: id });
    if (!user) throw ({ code: 402, msg: "No user was found" })
    return user
}
exports.createUser = (user) => {
    if (!user) throw ({ code: 401, msg: "No data was sent" })
    return userController.create(user)
}

exports.register = async (user) => {
    const Euser = await userController.read({ email: user.email })
    if (Euser.length) throw ({ code: 400, message: "this email is already exist" })
    return await userController.create(user)
}

exports.login = async (username, password) => {
    if (!username || !password) throw ({ code: 409, message: "missing data" })
    const Euser = await userController.readOne({ username }, "+password")
    if (!Euser) throw ({ code: 404, message: "user not found" })
    if (password !== Euser.password) throw ({ code: 503, message: "not auth" })
    return createToken(Euser._id)
}