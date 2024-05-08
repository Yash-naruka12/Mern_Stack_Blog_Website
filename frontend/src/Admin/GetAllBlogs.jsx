import React from "react";
import { AuthProvider } from "../Context/Store";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Footer from "../Pages/Footer/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const GetAllBlogs = () => {
  const { allUsersBlogs, deletUserBlog } = AuthProvider();
  if (!allUsersBlogs) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="heading">
        <h5 className="text-2xl font-bold pb-10 text-center">
          Admin Blogs Page
        </h5>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-8">
        {allUsersBlogs.map((data) => (
          <div
            className="w-[280px] min-h-[450px] rounded-md"
            key={data._id}
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
              <h5 className="bg-[#6c5ce7] text-black inline-block px-3 py-1 rounded-full capitalize text-sm font-semibold">
                {data.category}
              </h5>

              <h3 className="text-black mt-3.5 text-lg font-bold">
                {data.title}
              </h3>
              <p className="text-black mt-4 text-sm font-light w-[100%]">
                {data.description.split(" ").slice(0, 20).join(" ")}...
              </p>
            </div>
            <div className="flex justify-between items-center pr-3">
              <button className="text-[#6c5ce7] px-3 py-1 border-none ms-2">
                Read More <KeyboardDoubleArrowRightIcon />
              </button>
              <IconButton onClick={() => deletUserBlog(data._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default GetAllBlogs;
