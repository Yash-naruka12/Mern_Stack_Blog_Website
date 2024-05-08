const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const fs = require("fs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(400).send({ message: "Users not found" });
    }

    return res
      .status(200)
      .send({ message: "All Users found successfully", users });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return res.status(400).send({ message: "Blogs not found" });
    }

    return res.status(200).send({ message: "Blogs found sucessfully", blogs });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Error in deleting user" });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const deleteUserBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Error in deleting user" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(400).send({ message: "Blog not found" });
    }

    const filePath = "./src" + blog.image.path;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error in deleting file");
      }
      console.log("File deleted successfully");
    });

    await Blog.findByIdAndDelete(id);
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { getAllUsers, getAllBlogs, deleteUser, deleteUserBlog };
