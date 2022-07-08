const Connection = require('./../../mongoDB.js')
const authentication = require("../../authentication.js")
const argon2 = require('argon2')

const register = async (req, res) => {
    const paramsNeeded = ["username", "password", "age", "location", "categories", "timings", "telegram_id"]
    const collections = Connection.collections

    for (let i = 0; i < paramsNeeded.length; i++) {
        if (!(paramsNeeded[i] in req.body)) return res.send({
            success: false,
            error: "missing-params: " + paramsNeeded[i]
        })
    }

    const cleanedUsername = req.body.username.toLowerCase()

    await collections.users.insertOne({
        username: cleanedUsername,
        password: await argon2.hash(req.body.password),
        age: req.body.age,
        location: req.body.location,
        categories: req.body.categories,
        timings: req.body.timings,
        telegram_id: req.body.telegram_id
    })

    const signer = authentication.getSigner()

    res.send({
        success: true,
        token: signer.sign(cleanedUsername)
    })
    


}

module.exports = register 