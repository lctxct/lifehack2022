const Connection = require('./../../mongoDB.js')

const list = async (req, res) => {
    const collections = Connection.collections
    return res.send({
        success: true,
        organisations: await collections.organisations.find({}).toArray()
    })
}

module.exports = list