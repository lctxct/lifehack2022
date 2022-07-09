const Connection = require('./../../mongoDB.js')

const findBuddy = async (req, res) => {
    const collections = Connection.collections

    if (!req.body.username) return res.send({
        success: false,
        error: "missing-params"
    })

    const currentUser = await collections.users.findOne({ username: req.body.username }, {projection: {_id: 0, password: 0}})
    if (!currentUser) return res.send({ success: false, error: "user-not-found" })

    let recommendedBuddies = []
    await collections.users.find({}, {projection: {_id: 0, password: 0}}).forEach(async (doc) => {
        if (doc.username !== req.body.username) {
            // if age difference < 10
            if (Math.abs(currentUser.age - doc.age) < 10) {
                let sameCategory = false
                for (let i = 0; i < currentUser.categories.length; i++) {
                    if (doc.categories.includes(currentUser.categories[i])) {
                        sameCategory = true
                        break
                    }
                }

                // if the user contains at least 1 category that appears in the other user's preferences
                if (sameCategory) {
                    // if same location
                    if (currentUser.location.toLowerCase() === doc.location.toLowerCase()) recommendedBuddies.push(doc)
                }
            }
        }

    })

    res.send({
        success: true,
        recommendedBuddies: recommendedBuddies
    }) 
}

module.exports = findBuddy