const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, process.env.secretKey, function (err, decoded) {
        if (decoded) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(401).json({ "message": "You're not authorized for this operation.", "error": err.message })
        }
    });
}

module.exports = { authentication }