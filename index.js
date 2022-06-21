require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000
// PORT = 3000


const router = require('./Routes')
app.use(express.json())
app.use(require('cors')())

app.use("/api", router)

app.listen(PORT, () => console.log(`server is running => ${PORT}`))
require('./DL/db').connect();