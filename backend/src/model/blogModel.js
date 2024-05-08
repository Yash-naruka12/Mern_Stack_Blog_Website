const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    name: { type: String, required: true },
    ext: { type: String, required: true },
    path: { type: String, required: true },
    mimeType: { type: String, required: true },
  },
  category: { type: String, required: true },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Blog = new mongoose.model("Blog", blogSchema);
module.exports = Blog;
