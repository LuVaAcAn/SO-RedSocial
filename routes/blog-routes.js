import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from '../controllers/blog-controllers.js';
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.post("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;