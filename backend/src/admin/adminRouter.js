const express = require("express");
const {
  getAllUsers,
  getAllBlogs,
  deleteUser,
  deleteUserBlog,
} = require("./adminController");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");

const adminRouter = express.Router();

adminRouter.get("/user", authMiddleware, adminMiddleware, getAllUsers);
adminRouter.get("/blogs", authMiddleware, adminMiddleware, getAllBlogs);
adminRouter.delete(
  "/delete/user/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);
adminRouter.delete(
  "/delete/blog/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserBlog
);

module.exports = adminRouter;
