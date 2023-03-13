const express = require('express')
const mongoose = require('mongoose');
const route = require('./routes/route');
const cors = require('cors')


const app = express()

require('dotenv').config()
app.use(cors({
    origin: "*"
}))

app.use(express.json())

mongoose.connect(process.env.CLUSTER,
    { useNewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message));

app.use('/', route)
app.use('/*', (req, res) => {
    return res.status(400).send({ msg: "no such url" })
})

app.listen(process.env.PORT, () => {
    console.log("Express app is running on port" + process.env.PORT)
})