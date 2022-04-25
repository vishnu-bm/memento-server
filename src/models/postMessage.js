import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    creator: {
        type: String,
    },
    tags: {
        type: [String]
    },
    selectedFile: {
        type: String,
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }

})

const postMessage = mongoose.model('PostMessage', postSchema)

export default postMessage