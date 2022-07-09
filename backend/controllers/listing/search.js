const Connection = require('./../../mongoDB.js')

const search = async (req, res) => {
    if (!req.body.query) {
        return res.send({
            success: false,
            error: "missing-param"
        })
    }

    const collections = Connection.collections
    const corpus = []
    const corpusMapping = {}
    let counter = 1
    await collections.opportunities.find({}).forEach((doc) => {
        corpus.push(doc.event_name + ". " + doc.description)
        corpusMapping[counter] = doc
        counter += 1
    })

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3.8', ["main.py", req.body.query, JSON.stringify(corpus)], { cwd: __dirname });
    
    pythonProcess.stdout.on('data', (data) => {
        console.log(data)
        const corpusIDs = JSON.parse(data)
        let finalDocs = []
        for (let i = 0; i < corpusIDs.length; i++) {
            finalDocs.push(corpusMapping[corpusIDs[i]])
        }
        return res.send({
            success: true,
            filteredOpportunities: finalDocs
        })

    });

    pythonProcess.on("error", (err) => {
        console.log("Error occured in python script")
        console.error(err)
    })

}

module.exports = search