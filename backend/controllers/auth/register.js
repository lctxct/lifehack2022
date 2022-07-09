const Connection = require('./../../mongoDB.js')
const authentication = require("../../authentication.js")
const argon2 = require('argon2')

const register = async (req, res) => {
    const paramsNeeded = ["username", "password", "age", "location", "categories", "timings", "telegram_id", "bio"]

    for (let i = 0; i < paramsNeeded.length; i++) {
        if (!(paramsNeeded[i] in req.body)) return res.send({
            success: false,
            error: "missing-param: " + paramsNeeded[i]
        })
    }

    const collections = Connection.collections
    const cleanedUsername = req.body.username.toLowerCase()

    if (!Array.isArray(req.body.categories)) return res.send({
        success: false,
        error: "format"
    })

    await collections.users.insertOne({
        username: cleanedUsername,
        password: await argon2.hash(req.body.password),
        age: req.body.age,
        location: req.body.location.toLowerCase(),
        categories: req.body.categories,
        timings: req.body.timings,
        telegram_id: req.body.telegram_id,
        bio: req.body.bio
    })

    const signer = authentication.getSigner()

    res.send({
        success: true,
        token: signer.sign(cleanedUsername)
    })
    


}

module.exports = register 