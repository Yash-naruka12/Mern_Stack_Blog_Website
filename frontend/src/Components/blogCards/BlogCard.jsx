import React from "react";
import { AuthProvider } from "../../Context/Store";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const BlogCard = () => {
  const { allBlogs, query } = AuthProvider();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {allBlogs
        .filter((item) => item.category.toLowerCase().includes(query))

        .map((data) => (
          <Link key={data._id} to={`/user/blog/${data._id}`}>
            <div
              className="w-[280px] min-h-[450px] rounded-md"
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

                <h3 className="text-white mt-3.5 text-lg font-bold">
                  {data.title}
                </h3>
                <p className="text-white mt-4 text-sm font-light w-[100%]">
                  {data.description.split(" ").slice(0, 20).join(" ")}...
                </p>
              </div>
              <button className="text-[#6c5ce7] px-3 py-1 border-none ms-2">
                Read More <KeyboardDoubleArrowRightIcon />
              </button>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BlogCard;
