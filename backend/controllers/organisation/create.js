const Connection = require('./../../mongoDB.js')

const create = async (req, res) => {
    const paramsNeeded = ["organisation", "category", "description"]
    for (let i = 0; i < paramsNeeded.length; i++) {
        if (!(paramsNeeded[i] in req.body)) return res.send({
            success: false,
            error: "missing-param: " + paramsNeeded[i]
        })
    }

    const collections = Connection.collections
    await collections.organisations.insertOne({
        organisation: req.body.organisation.toLowerCase(),
        category: req.body.category.toLowerCase(),
        description: req.body.description
    })

    res.send({ success: true })
}

module.exports = create