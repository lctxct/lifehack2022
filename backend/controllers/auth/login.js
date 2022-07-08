const authentication = require("../../authentication.js")
const Connection = require('./../../mongoDB.js')
const argon2 = require('argon2')

const login = async (req, res) => {
    const collections = Connection.collections
    const signer = authentication.getSigner()

    if (!req.body.username || !req.body.password) return res.send({
        success: false,
        error: "missing-params"
    })

    const cleanedUsername = req.body.username.toLowerCase()

    const user = await collections.users.findOne({ username: cleanedUsername })

    if (!user) return res.send({
        success: false,
        error: "wrong-details"
    })

    if (await argon2.verify(user.password, req.body.password)) {
        res.send({
            success: true,
            token: signer.sign(cleanedUsername)
        })
    }
    else {
        return res.send({
            success: false,
            error: "wrong-details"
        })
    }
}

module.exports = login