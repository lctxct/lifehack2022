const Connection = require('./../../mongoDB.js')

const listUsers = async (req, res) => {
    const collections = Connection.collections
    return res.send({
        success: true,
        users: await collections.users.find({}, { projection: { _id: 0, password: 0 } }).toArray()
    })
}

module.exports = listUsers