import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthProvider } from "../../Context/Store";
import Loader from "../../Pages/Loader/Loader";

const SignleBlog = () => {
  const { id } = useParams();
  const { loading, setLoading } = AuthProvider();
  const [singleBlog, setSingleBlog] = useState([]);
  const getSingleBlog = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/single-blog/${id}`
      );

      // setTimeout(() => {
      setSingleBlog([data.findSingleBlog]);
      setLoading(false);
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <div className="w-screen p-10">
          {singleBlog.map((data) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-2 place-items-center"
              key={data._id}
            >
              <div className="blog-image w-full">
                <img
                  src={`http://localhost:5000${data.image.path}`}
                  className="w-full h-full rounded-md"
                  alt={data.image.name}
                />
              </div>

              <div className="blog-content w-[90%] ">
                <p className="text-white font-semibold mb-5 text-4xl">
                  {data.title}.
                </p>
                <p className="text-white font-light text-justify text-sm">
                  {data.description.length > 1050
                    ? data.description.slice(
                        0,
                        data.description.lastIndexOf(" ", 1050)
                      ) + "..."
                    : data.description}
                </p>
              </div>

              <div></div>

              <p className="text-white font-light text-justify text-sm w-[90%]">
                {data.description.slice(1050)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SignleBlog;
