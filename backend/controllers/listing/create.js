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
    
    // Check if organisation exists, otherwise, create one.
    const cleanedOrgName = req.body.organisation.toLowerCase()
    const cleanedCatName = req.body.category.toLowerCase()
    const org = await collections.organisations.findOne({organisation: cleanedOrgName})
    if (!org) {
        await collections.organisations.insertOne({organisation: cleanedOrgName, category: cleanedCatName, description: cleanedOrgName + " is an organisation dealing with " + req.body.category})
    }

    if (!Array.isArray(req.body.training_program)) return res.send({
        success: false,
        error: "training-needs-to-be-array"
    })

    
    await collections.opportunities.insertOne({
        organisation: cleanedOrgName,
        event_name: req.body.event_name,
        category: cleanedCatName,
        description: req.body.description,
        timing: req.body.timing,
        location_name: req.body.location.toLowerCase(),
        training_program: req.body.training_program
    })

    res.send({ success: true })
}

module.exports = create