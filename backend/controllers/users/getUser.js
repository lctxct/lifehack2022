const Connection = require('./../../mongoDB.js')

const getUser = async (req, res) => {

    if (!req.body.username) return res.send({
        success: false,
        error: "missing-params"
    })

    const cleanedUsername = req.body.username.toLowerCase()

    const collections = Connection.collections

    const user = await collections.users.findOne({ username: cleanedUsername }, { projection: { _id: 0, password: 0 } })
    if (!user) return res.send({
        success: false,
        error: "user-not-found"
    })

    // search for experiences the user wrote
    let userExperiences = []
    const experiences = await collections.experiences.find({}, {}).toArray()
    for (let i = 0; i < experiences.length; i++) {
        if (experiences[i].username === cleanedUsername) userExperiences.push(experiences[i])
    }
    user.experiences = userExperiences

    return res.send({
        success: true,
        data: user
    })

}

module.exports = getUser