const Connection = require('./../../mongoDB.js')

const queryOrg = async (req, res) => {
    if (!req.body.organisation) return res.send({
        success: false,
        error: "missing-params"
    })


    const collections = Connection.collections
    const cleanedName = req.body.organisation.toLowerCase()

    const org = await collections.organisations.findOne({ organisation: cleanedName }, { projection: { _id: 0 } })
    if (org) {
        // Find experiences linked to organisation
        const experiences = await collections.experiences.find({ organisation: cleanedName }).toArray()

        // Find opportunities linked to org
        const opportunities = await collections.organisations.find({ organisation: cleanedName }).toArray()

        res.send({
            success: true,
            orgInfo: org,
            experiences: experiences,
            opportunities: opportunities
        })
    }
    else {
        return res.send({
            success: false,
            error: "not-found"
        })
    }
}

module.exports = queryOrg