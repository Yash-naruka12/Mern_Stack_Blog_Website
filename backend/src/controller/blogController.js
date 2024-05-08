const Blog = require("../model/blogModel");
const randomString = require("randomstring");
const fs = require("fs");
const sanitizeHtml = require("sanitize-html");

const fileUpload = (file) => {
  let name = randomString.generate({
    length: 12,
    charset: "alphabetic",
  });

  let ext = file.name.split(".");
  ext = ext[ext.length - 1];
  name += ".";
  name += ext;
  let mimeType = file.mimetype.split("/");
  mimeType = mimeType[0];
  mimeType =
    mimeType === "image" || mimeType === "video" ? mimeType : "document";
  let path = "/public/images/";
  path += name;
  file.mv("./src" + path);

  return {
    name,
    ext,
    mimeType,
    path,
  };
};

const sanitizeDescription = (html) => {
  return sanitizeHtml(html, {
    allowedTags: ["strong", "em"],
    allowedAttributes: {
      a: ["href", "target"],
    },
  });
};

const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.user._id;
    const sanitizedDescription = sanitizeDescription(req.body.description);

    if (!title || !description || !category || !req.files || !req.files.image) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const file = req.files.image;

    if (!title || !description || !category || !file) {
      return res
        .status(400)
        .send({ message: "Please provide all create blog fields" });
    }

    const userImage = fileUpload(file);

    const userblog = new Blog({
      title,
      description: sanitizedDescription,
      category,
      image: userImage,
      UserId: userId,
    });

    const saveBlog = await userblog.save();

    return res
      .status(201)
      .send({ message: "Blog created successfully", saveBlog });
  } catch (error) {
    return res.status(500).send({ message: "Internal server is error" });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const UserId = req.user._id;

    if (!UserId) {
      return res
        .status(401)
        .send({ message: "Unauthorization access please login" });
    }

    const getUserBlogData = await Blog.find({ UserId });

    return res.status(200).send({ message: "Success", getUserBlogData });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error please try again" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const userId = req.params.id;
    const { title, description } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "Please provide valid id" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      userId,
      { title, description },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    return res
      .status(200)
      .send({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    // Delete the associated file
    const filePath = "./src" + blog.image.path;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error deleting file:", err);
        return res.status(500).send({ message: "Error deleting file" });
      }
      console.log("File deleted successfully");
    });

    // Delete the blog from the database
    await Blog.findByIdAndDelete(blogId);

    return res
      .status(200)
      .send({ message: "Blog and associated file deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allData = await Blog.find();

    if (!allData) {
      return res.status(200).send({ message: "All blog data" });
    }

    return res.status(200).send({ message: "All blog data", allData });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error please try again" });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const findSingleBlog = await Blog.findById(id);

    if (!findSingleBlog) {
      return res.status(400).send({ message: "Blog not found" });
    }

    return res.status(200).send({ message: "Blog found", findSingleBlog });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error please try again" });
  }
};

module.exports = {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
};
