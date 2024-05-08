import React, { useRef, useState } from "react";
import { AuthProvider } from "../../Context/Store";
import toast from "react-hot-toast";
import axios from "axios";
import JoditEditor from "jodit-react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateBlog = () => {
  const { token, userId, setAllBlogs, allUserBlogs, getUserBlogs } =
    AuthProvider();
  const editor = useRef();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
    UserId: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorBlur = () => {
    if (editor.current) {
      setBlogData((prevData) => ({
        ...prevData,
        description: editor.current.value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogData((prevData) => ({
      ...prevData,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("category", blogData.category);
      formData.append("image", blogData.image);

      const { data } = await axios.post(
        "http://localhost:5000/api/user/create-blog",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllBlogs(data);
      allUserBlogs();
      getUserBlogs();
      setBlogData({
        title: "",
        description: "",
        image: null,
        category: "",
        UserId: userId,
      });
      setImagePreview(null);

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="h-screen w-screen p-20">
      <div className="blog-heading text-center">
        <h2
          className="text-white text-3xl lg:text-5xl mb-10 lg:mb-0"
          style={{
            fontFamily: "cursive",
          }}
        >
          Create Blog
        </h2>
      </div>
      <form
        onSubmit={handleCreateBlog}
        encType="multipart/form-data"
        className="grid grid-cols-1 lg:grid-cols-2 place-items-center h-[100%]"
      >
        <div className="create-content">
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
            className="w-[100%] px-3 py-3 rounded-md mb-4 outline-none"
          />

          <JoditEditor
            ref={editor}
            value={blogData.description}
            onBlur={handleEditorBlur}
            required
          />
          <select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            required
            className="w-full px-2 py-3 mt-3 rounded-md outline-none cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="gaming">Gaming</option>
            <option value="product">Product</option>
            <option value="cars">Car</option>
            <option value="health">Health</option>
            <option value="bussiness">Bussiness</option>
            <option value="technology">Technology</option>
            <option value="food">Food</option>
          </select>
          <button
            type="submit"
            className="bg-white text-black px-10 py-1 lg:px-18 rounded-md text-lg border block mx-auto lg:py-2 mt-5 hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Create
          </button>
        </div>

        <div className="create-image mt-10 lg:mt-0">
          <label
            htmlFor="file"
            className="relative border border-dashed w-[400px] h-[250px] flex justify-center items-center cursor-pointer rounded-md"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="upload-image"
                className=" absolute w-full h-full rounded-md"
              />
            ) : (
              <div className="flex justify-center flex-col items-center">
                <CloudUploadIcon
                  sx={{
                    fontSize: "4rem",
                    color: "white",
                  }}
                />
                <p className="text-white">Browse file for upload</p>
              </div>
            )}
            <input
              type="file"
              name="image"
              id="file"
              onChange={handleFileChange}
              hidden={true}
              required
              className="w-[100%] h-[100%] cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
