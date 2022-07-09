const Connection = require('./../../mongoDB.js')

const generate_training = async (req, res) => {
    
    if (!req.body.event_name || !req.body.description) {
        return res.send({
            success: false,
            error: "missing-param"
        })
    }

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python3.8', ["program-suggestion-model/prediction.py", req.body.event_name, req.body.description], { cwd: __dirname });
    
    pythonProcess.on("error", (err) => {
        console.log("Error occured in python script")
        console.error(err)
    })

    const generatedTrainings = await new Promise((resolve, reject) => {
        let finalData = ""
        pythonProcess.stdout.on('data', (data) => {
            finalData += data.toString()
            console.log("data: " + data)
        });
        pythonProcess.stderr.on('data', (data) => {
            console.log("error: " + data)
        });
        pythonProcess.stdout.on("end", (data) => {
            console.log("end")
            resolve(JSON.parse(data))           
        })
    });
    return res.send({
        success: true,
        generatedTrainings: generatedTrainings
    })


}

module.exports = generate_training