import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
    try {
        const postMsg = await postMessage.find({});
        res.status(200).send(postMsg)

    } catch (err) {
        res.status(404).send({ message: "cannot connect" })
    }
}
export const createPosts = async (req, res) => {
    const posts = new postMessage({...req.body, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await posts.save()
        res.status(201).send(posts)
    } catch (err) {
        res.status(409).send({ message: err.message })
    }
}
export const updatePosts = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id")
    try {
        const updatePost = await postMessage.findByIdAndUpdate(_id, req.body, { new: true })
        res.status(200).send(updatePost);
    } catch (err) {
        res.status(500).send({ message: err.message })

    }
}
export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id")
    try {
        const deleted = await postMessage.findByIdAndRemove(_id)
        res.status(200).send(deleted)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id")
    if (!req.userId) return res.send({ message: "unauthenticated"})
    try {
        const post = await postMessage.findById(_id);
        const index = post.likes.findIndex((id) => id === String(req.userId));
        if(index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }
        const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true })
        res.status(200).send(updatedPost)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}