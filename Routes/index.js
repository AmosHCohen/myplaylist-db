const { model } = require("mongoose")

const express = require("express"),
    router = express.Router(),
    userRouter = require('./userRoute')
// itemRouter = require('./itemRoute'),
// orderRouter = require('./orderRoute')

router.use('/users', userRouter)
// router.use('/items', itemRouter)
// router.use('/orders', orderRouter)

module.exports = router