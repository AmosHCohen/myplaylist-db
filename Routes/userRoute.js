const express = require("express"),
    router = express.Router()
const userLogic = require('../BL/userLogic')
const { authJWT } = require("../Middleware/auth")

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
        res.send(newUser)
    } catch (error) {
        if (error.code) {
            res.status(error.code).send({ message: error.msg })

        } else {
            res.status(500).send({ message: "something went wronge" })
        }
    }
})

router.get("/getid", authJWT, async (req, res) => {
    console.log("i'm alive");
    console.log("getID", req.id.id);
    userLogic.getUserById(req.id.id)
})

module.exports = router

