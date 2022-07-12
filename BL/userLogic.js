const userController = require('../DL/controllers/userController')
const { createToken } = require('../middleware/jwt')
const bcrypt = require('bcrypt')


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

exports.register = async (data) => {
    const { email, password, firstName, lastName } = data
    if (!email || !password || !firstName || !lastName) {
        throw { code: 400, message: "missing data" }
    }
    const Euser = await userController.read({ email: email })
    console.log(data);
    if (Euser.length) throw ({ code: 405, message: "this email is already exist" })
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    data.salt = salt
    data.hashedPassword = hashedPassword
    delete data.password
    const user = await userController.create(data)
    const token = createToken(user._id)
    return token
}

exports.login = async (data) => {
    const { email, password } = data
    if (!email || !password) throw ({ code: 409, message: "missing data" })
    const Euser = await userController.readOne({ email }, "+hashedPassword +salt")
    if (!Euser) throw ({ code: 404, message: "user not found" })
    const hashedPassword = await bcrypt.hash(password, Euser.salt)
    console.log(Euser, hashedPassword);
    if (hashedPassword !== Euser.hashedPassword) throw ({ code: 503, message: "not auth" })
    return createToken(Euser._id)
}