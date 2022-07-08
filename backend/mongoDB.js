const mongoDB = require('mongodb')

class Connection {

    static async open() {

        if (this.db) return true
        const status = await mongoDB.MongoClient.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(async (client) => {
            const db = client.db('sussyvolunteer')
            const collections = {
                users: db.collection('users'),
                opportunities: db.collection('opportunities'),
                experiences: db.collection('experiences')
            }
            this.db = db
            this.collections = collections
            console.info("MongoDB connected successfully!")
            return true
        }).catch((error) => {
            console.error(error)
            console.error("Error connecting to MongoDB")
            return false
        })
        return status
    }

}

Connection.db = null
Connection.collections = null
module.exports = Connection
