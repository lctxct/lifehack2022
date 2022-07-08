const Connection = require('./../../mongoDB.js')

const writeExperience = async (req, res) => {
    const paramsNeeded = ["organisation", "description", "rating"]

    for (let i = 0; i < paramsNeeded.length; i++) {
        if (!(paramsNeeded[i] in req.body)) return res.send({
            success: false,
            error: "missing-param: " + paramsNeeded[i]
        })
    }

    const collections = Connection.collections
    await collections.experiences.insertOne({
        username: req.locals.username,
        organisation: req.body.organisation,
        description: req.body.description,
        rating: req.body.rating
    })

    res.send({ success: true })
}

module.exports = writeExperience