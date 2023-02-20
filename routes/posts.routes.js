const express = require("express");
const { getPosts, getTopPost, postPost, updatePost, deletePost } = require("../controllers/posts.controller");
const { authentication } = require("../middlewares/authentication.middleware");
const { validatePost } = require("../middlewares/validatePost.middleware");

const postsRouter = express.Router();
postsRouter.use(authentication)

postsRouter.get("/", getPosts)
postsRouter.get("/top", getTopPost)
postsRouter.post("/", validatePost, postPost)
postsRouter.patch("/update/:id", validatePost, updatePost)
postsRouter.delete("/delete/:id", deletePost)


module.exports = { postsRouter }