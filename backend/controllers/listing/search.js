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
    let counter = 0
    await collections.opportunities.find({}).forEach((doc) => {
        corpus.push(doc.event_name + ". " + doc.description)
        corpusMapping[counter] = doc
        counter += 1
    })

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3.8', ["main.py", req.body.query, JSON.stringify(corpus)], { cwd: __dirname });

    pythonProcess.on("error", (err) => {
        console.log("Error occured in python script")
        console.error(err)
    })

    const filteredOpportunities = await new Promise((resolve, reject) => {
        let finalData = ""
        pythonProcess.stdout.on('data', (data) => {
            finalData += data.toString()
        });
        pythonProcess.stdout.on("end", () => {
            console.log(finalData)
            /*
            const corpusIDs = JSON.parse(finalData)
            let finalDocs = []
            for (let i = 0; i < corpusIDs.length; i++) {
                // TIL: Javascript automatically converts non-string key values into strings
                finalDocs.push(corpusMapping[corpusIDs[i].toString()])
            }*/
            resolve(finalDocs)           
        })
    });
    return res.send({
        success: true,
        filteredOpportunities: filteredOpportunities
    })

}

module.exports = search