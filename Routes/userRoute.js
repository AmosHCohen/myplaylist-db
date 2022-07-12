const express = require("express"),
    router = express.Router()
const userLogic = require('../BL/userLogic')
const { authJWT } = require("../Middleware/auth")

// router.all('/test', authJWT, (req, res) => {
//     res.send("test")
// })

router.post("/login", async (req, res) => {
    try {
        res.send(await userLogic.login(req.body))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post("/register", async (req, res) => {
    try {
        const newUser = await userLogic.register(req.body)
        res.send('registered')
    } catch (error) {
        if (error.code) {
            res.status(error.code).send({ message: error.msg })

        } else {
            res.status(500).send({ message: "something went wronge" })
        }

        // res.status(500).send("someting went wrong")
    }
})

module.exports = router

