import React, { useRef } from "react";
import { AuthProvider } from "../../Context/Store";
import JoditEditor from "jodit-react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const {
    userUpdateData,
    setUserUpdateData,
    token,
    allUserBlogs,
    getUserBlogs,
  } = AuthProvider();
  const editor = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleEditorBlur = () => {
    if (editor.current) {
      setUserUpdateData((prevData) => ({
        ...prevData,
        description: editor.current.value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(
        `http://localhost:5000/api/user/update/${userUpdateData._id}`,
        userUpdateData,
        { headers: { Authorization: token } }
      );

      toast.success(data.message);
      allUserBlogs();
      getUserBlogs();
      setUserUpdateData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
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
        onSubmit={handleUpdate}
        encType="multipart/form-data"
        className="grid place-items-center h-[100%]"
      >
        <div className="create-content">
          <input
            type="text"
            name="title"
            value={userUpdateData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
            className="w-[100%] px-3 py-3 rounded-md mb-4 outline-none"
          />

          <JoditEditor
            ref={editor}
            value={userUpdateData.description}
            onBlur={handleEditorBlur}
            required
          />
          <select
            name="category"
            value={userUpdateData.category}
            onChange={handleChange}
            required
            className="w-full px-2 py-3 mt-3 rounded-md outline-none cursor-pointer"
          >
            <option
              value={`${userUpdateData.category}`}
              className=" capitalize inline-block"
            >
              {userUpdateData.category}
            </option>
          </select>
          <button
            type="submit"
            className="bg-white text-black px-10 py-1 lg:px-18 rounded-md text-lg border block mx-auto lg:py-2 mt-5 hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
