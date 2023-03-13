const jwt = require('jsonwebtoken')


async function authentication(req, res, next) {
    try {
        const token = req.header('Authorization').replace("Bearer ", "")
        jwt.verify(token, "my_key", (err, decode) => {
            if (err) {
                return res.status(201).send({ msg: err.message })
            }
            else {
                req.userId = decode.userId
                next()
            }
        })
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

async function authorization(req, res, next) {
    try {
        const data = req.body
        const userId = data.userId
        const rUserId = req.userId
        if (userId == rUserId) {
            next()
        }
        else {
            res.status(403).send({ msg: "user not authorized" })
        }
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

module.exports = { authentication, authorization }