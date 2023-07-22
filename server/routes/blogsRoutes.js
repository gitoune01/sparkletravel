import express from "express";
import { createBlog, getBlogbycat } from "../controllers/blogsControllers.js";
const router = express.Router()

router.post('/create', createBlog)
router.get('/getblogbycat', getBlogbycat)




export default router
