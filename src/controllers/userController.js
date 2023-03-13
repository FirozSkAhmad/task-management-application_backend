const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function createUser(req, res) {
    try {
        const data = req.body

        const hashPassword = await bcrypt.hash(data.password, 10)
        data.password = hashPassword

        let checkEmail = await userModel.findOne({ email: data.email });
        if (checkEmail) {
            return res.status(401).send("email is already exist")
        }

        const createdUser = await userModel.create(data)
        return res.status(201).send(createdUser)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}


async function userLogin(req, res) {
    try {
        const data = req.body
        const { email, password } = data

        const userDetails = await userModel.findOne({ email })
        if (!userDetails) {
            return res.status(401).send({ msg: "no user exists with the given emailId" })
        }

        const login = await bcrypt.compare(password, userDetails.password)

        if (login) {
            const token = jwt.sign({
                userId: userDetails._id,
                name: userDetails.name
            }, "my_key")
            return res.status(200).send({ msg: "logined successfully", token })
        }

        return res.status(401).send({ msg: "incorrect password" })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

module.exports = { createUser, userLogin }