import express from 'express';
import { createBlog, getBlogbycat, getSingleBlog } from '../controllers/blogsControllers.js';
const router = express.Router();

router.post('/create', createBlog);
router.get('/getblogbycat/:category/:page', getBlogbycat);
router.get('/getsingleblog/:id', getSingleBlog);

export default router;
