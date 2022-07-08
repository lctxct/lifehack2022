const Connection = require('./../../mongoDB.js')

const create = async (req, res) => {
    const paramsNeeded = ["organisation", "event_name", "category", "description", "timing", "location", "training_program"]

    for (let i = 0; i < paramsNeeded.length; i++) {
        if (!(paramsNeeded[i] in req.body)) return res.send({
            success: false,
            error: "missing-param: " + paramsNeeded[i]
        })
    }

    const collections = Connection.collections
    await collections.opportunities.insertOne({
        organisation: req.body.organisation,
        event_name: req.body.event_name,
        category: req.body.category,
        description: req.body.description,
        timing: req.body.timing,
        location_name: req.body.location,
        training_program: req.body.training_program
    })

    res.send({ success: true })
}

module.exports = create