const express = require("express");
const { registerUser, loginUser } = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser)

usersRouter.post("/login", loginUser)

module.exports = { usersRouter }