const Connection = require('./../../mongoDB.js')
const authentication = require("../../authentication.js")
const argon2 = require('argon2')

const register = async (req, res) => {
    const paramsNeeded = ["username", "password", "age", "location", "categories", "timings", "telegram_id"]

    for (let i = 0; i < paramsNeeded.length; i++) {
        if (!(paramsNeeded[i] in req.body)) return res.send({
            success: false,
            error: "missing-param: " + paramsNeeded[i]
        })
    }

    const collections = Connection.collections
    const cleanedUsername = req.body.username.toLowerCase()

    // clean categories
    let cleanedCategories = []
    for (let i = 0; i < req.body.categories.length; i++) {
        cleanedCategories.push(req.body.categories[i].toLowerCase())
    }

    await collections.users.insertOne({
        username: cleanedUsername,
        password: await argon2.hash(req.body.password),
        age: req.body.age,
        location: req.body.location.toLowerCase(),
        categories: cleanedCategories,
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