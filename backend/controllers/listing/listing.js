const Connection = require('./../../mongoDB.js')

const listing = async (req, res) => {
    const collections = Connection.collections

    return res.send({
        success: true,
        opportunities: await collections.opportunities.find({}).toArray()
    })
}

module.exports = listing