const express = require("express");
const {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} = require("../controller/blogController");
const { authMiddleware } = require("../middleware/authMiddleware");

const blogRouter = express.Router();

blogRouter.post("/create-blog", authMiddleware, createBlog);
blogRouter.get("/get-blog", authMiddleware, getUserBlogs);
blogRouter.put("/update/:id", authMiddleware, updateBlog);
blogRouter.delete("/delete/:id", authMiddleware, deleteBlog);
blogRouter.get("/all-blogs", getAllBlogs);
blogRouter.get("/single-blog/:id", getSingleBlog);

module.exports = blogRouter;
