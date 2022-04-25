import express from "express";
import { getPosts, createPosts, updatePosts, deletePost, likePost } from "../controller/posts.js";
import auth from '../../middleware/auth.js'


const router = express.Router()

router.get('/', getPosts)
router.post('/',auth, createPosts)
router.patch('/:id',auth, updatePosts)
router.delete('/:id',auth, deletePost)
router.patch('/:id/like',auth, likePost)

export default router

