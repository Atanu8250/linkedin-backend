const { PostModel } = require("../models/posts.model");

const getPosts = async (req, res) => {
    const query = req.query;

    let device1 = "";
    let device2 = "";
    let device3 = "";
    for (let key in query) {
        if (key == "device1") {
            device1 = query[key]
        } else if (key == "device2") {
            device2 = query[key]
        } else if (key == "device3") {
            device3 = query[key]
        } else if (key == "device") {
            device1 = query[key]
        }
    }
    try {
        let posts;
        if (Object.keys(query).length) {
            posts = await PostModel.find({ $and: [{ athor: req.userId }, { $or: [{ device: device1 }, { device: device2 }, { device: device3 }] }] });
        } else {
            posts = await PostModel.find({ athor: req.userId });
        }
        res.status(200).json({ "message": "Success", "data": posts })
    } catch (error) {
        res.status(404).json({ "message": "Something went wrong!", "error": error.message })
    }
}

const getTopPost = async (req, res) => {
    try {
        const posts = await PostModel.find({ author: req.userId }).sort({ no_if_comments: -1 })
        res.status(200).json({ "message": "Success", "data": posts[0] })
    } catch (error) {
        res.status(404).json({ "message": "Something went wrong!", "error": error.message })
    }
}

const postPost = async (req, res) => {
    try {
        const post = new PostModel({ ...req.body, author: req.userId });
        await post.save();
        res.status(201).json({ "message": "New post created." })
    } catch (error) {
        res.status(400).json({ "message": "Something went wrong!", "error": error.message })
    }
}

const updatePost = async (req, res) => {
    const id = req.params.id;
    const changes = req.body
    try {
        const posts = await PostModel.find({ _id: id, author: req.userId });
        if (posts.length >= 1) {
            await PostModel.findByIdAndUpdate(id, changes);
            res.status(200).json({ "message": `Post with title: ${posts[0].title} updated successfully` })
        } else {
            res.status(401).json({ "message": "You're not authorized for this operation." })
        }
    } catch (error) {
        res.status(400).json({ "message": "Something went wrong!", "error": error.message })
    }
}

const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const posts = await PostModel.find({ _id: id, author: req.userId });
        if (posts.length >= 1) {
            await PostModel.findByIdAndDelete(id);
            res.status(200).json({ "message": `Post with title: ${posts[0].title} Delted successfully` })
        } else {
            res.status(401).json({ "message": "You're not authorized for this operation." })
        }
    } catch (error) {
        res.status(400).json({ "message": "Something went wrong!", "error": error.message })
    }
}

module.exports = { getPosts, getTopPost, postPost, updatePost, deletePost }