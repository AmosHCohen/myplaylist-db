const express = require("express"),
    router = express.Router()
const userLogic = require('../BL/userLogic')
const auth = require("../Middleware/auth")

router.all('/test', auth, (req, res) => {
    res.send("test")
})

router.post("/login", async (req, res) => {
    try {
        res.send(await userLogic.login(req.body.username, req.body.password))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/register", async (req, res) => {
    try {
        const newUser = await userLogic.register(req.body)
        res.send('registered')
    } catch (error) {
        res.status(500).send("someting went wrong")
    }
})

module.exports = router

