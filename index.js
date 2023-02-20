const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { postsRouter } = require("./routes/posts.routes");
const { usersRouter } = require("./routes/users.routes");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json())

app.use("/users", usersRouter)
app.use("/posts", postsRouter)

app.get("/", (req, res) => {
    res.send("Welcome to HOME page")
})

app.listen(process.env.port, async () => {
    try {
        console.log("⏳ Database connecting...");
        await connection;
        console.log("✅ Database connected.");
    } catch (error) {
        console.log('❌ error:', error.message)
    }
    console.log(`Server is live: http://localhost:${process.env.port}`);
})