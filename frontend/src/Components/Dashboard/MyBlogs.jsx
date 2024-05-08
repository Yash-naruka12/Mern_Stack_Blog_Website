import React from "react";
import { AuthProvider } from "../../Context/Store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const navigate = useNavigate();
  const { userBlogs, token, getUserBlogs, allUserBlogs, getUpdateData } =
    AuthProvider();

  const deleteBlog = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
        headers: { Authorization: token },
      });
      getUserBlogs();
      allUserBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userBlogs.length === 0 ? (
        <h1
          className="m-10 bg-white px-5 text-lg font-semibold py-3 rounded-md"
          style={{
            borderLeft: "5px solid red",
          }}
        >
          You haven't created blog
        </h1>
      ) : (
        <>
          <div className="heading text-white pt-10 px-10">
            <h4 className="text-3xl font-bold my-blogs">My Blogs</h4>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-10 min-h-[100vh]">
            {userBlogs.map((data) => (
              <div
                key={data._id}
                className="w-[300px] rounded-md"
                style={{
                  boxShadow: "0 0 5px #6c5ce7",
                }}
              >
                <div className="card-image mb-3">
                  <img
                    src={`http://localhost:5000${data.image.path}`}
                    alt={data.name}
                    className="w-full rounded-md"
                  />
                </div>

                <div className="blog-content px-4 py-2">
                  <h5 className="bg-[#6c5ce7] text-white inline-block px-3 py-1 rounded-full capitalize text-sm font-semibold">
                    {data.category}
                  </h5>

                  <h3 className="text-white mt-3.5 text-xl font-bold">
                    {data.title}
                  </h3>
                  <p className="text-white mt-4 text-sm font-light w-[100%]">
                    {data.description.split(" ").slice(0, 20).join(" ")}...
                  </p>
                </div>
                <div className="icons text-right px-5">
                  <IconButton
                    color="error"
                    onClick={() => deleteBlog(data._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      getUpdateData(data._id);
                      navigate("/user/update-blog");
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBlogs;
