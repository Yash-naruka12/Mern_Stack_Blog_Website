import React from "react";
import errorImage from "../../Components/assets/404.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen text-center mt-10 lg:px-20 px-10">
      <div className="error-page grid grid-cols-1 lg:grid-cols-2 place-items-center">
        <div className="errorpage-content text-[#6c5ce7] mb-10 lg:mb-0">
          <h4
            className="text-3xl lg:text-5xl font-bold"
            style={{
              filter: "drop-shadow(0 0 5px #6c5ce7)",
            }}
          >
            Oops !
          </h4>
          <h1
            className="text-7xl  lg:text-9xl font-bold mt-3"
            style={{
              filter: "drop-shadow(0 0 5px #6c5ce7)",
            }}
          >
            404
          </h1>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              filter: "drop-shadow(0 0 5px #6c5ce7)",
            }}
          >
            Page Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-10 border border-[#6c5ce7] px-5 py-2.5 flex justify-center items-center rounded-md hover:bg-[#6c5ce7] hover:text-white transition-all duration-300"
          >
            <ArrowBackIcon className="me-2" />
            Back To HomePage
          </button>
        </div>

        <div className="error-image">
          <img src={errorImage} alt="notfound" />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
