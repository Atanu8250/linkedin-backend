const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.model");

const registerUser = async (req, res) => {
    const { name, email, password, gender, age, city } = req.body;
    try {
        const users = await UserModel.find({ email });
        if (users.length > 0) {
            res.status(200).json({ "message": "User already exist, please login" })
        } else {
            bcrypt.hash(password, +process.env.saltRounds, async function (err, hash) {
                if (err) {
                    res.status(400).json({ "message": "Something went wrong!", "error": err })
                } else {
                    try {
                        const user = new UserModel({ name, email, password: hash, gender, age, city });
                        await user.save()
                        res.status(201).json({ "message": "User Register successfully." })
                    } catch (error) {
                        res.status(400).json({ "message": "Something went wrong!", "error": error.message })
                    }
                }
            });
        }
    } catch (error) {
        res.status(400).json({ "message": "Something went wrong!", "error": error.message })
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await UserModel.find({ email });
        if (users.length >= 1) {
            bcrypt.compare(password, users[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userId: users[0]._id }, process.env.secretKey, { expiresIn: '5h' });
                    res.status(200).json({ "message": "Login successful.", "token": token })
                } else {
                    res.status(401).json({ "message": "Wrong Password!" })
                }
            });
        } else {
            res.status(404).json({ "message": "User not found, Please Sign-up first." })
        }
    } catch (error) {
        res.status(400).json({ "message": "Something went wrong!", "error": error.message })
    }
}


module.exports = { registerUser, loginUser }