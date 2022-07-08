const RD = require("reallydangerous")

let signer = null;

const createSigner = () => {
    signer = new RD.Signer(process.env.SECRET, process.env.SALT);
}

const getSigner = () => {
    return signer
}

const authenticated = async (req, res) => {
    if (req.headers.authorization == undefined) throw new Error('MissingToken');
    let permissions = false
    let username = ""
    try {
        username = signer.unsign(req.headers.authorization);
    }
    catch (err) {
        throw new Error('BadToken');
    }
    if (permissions === false) throw new Error('BadToken');
    req.locals = {}
    req.locals.username = username
}

module.exports = { authenticated, createSigner, getSigner }