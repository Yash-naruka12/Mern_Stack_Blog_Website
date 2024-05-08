import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../Context/Store";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    userName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        { ...registerData }
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data);
        setRegisterData({
          userName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="register-container">
      <div className="register flex flex-col lg:flex-row">
        <div className="bg-[#1dd1a174] mb-10 lg:mb-0 py-4 px-3 h-full w-full  lg:w-[70%] flex flex-col justify-center items-center rounded-s-lg">
          <h3 className="text-2xl lg:text-4xl font-semibold text-white">
            Welcome Back
          </h3>
          <p className="text-center w-full my-3 md:w-80">
            To Keep Connected With Us Please Login With Your Personal Info
          </p>
          <button
            className="signIn mt-5 lg:mt-10"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
        <div className="w-[100%] bg-[#00000089] h-full rounded-e-lg flex flex-col justify-center items-center">
          <h3
            className="text-white text-center text-2xl lg:text-5xl mb-10"
            style={{
              fontFamily: "fantasy",
            }}
          >
            Register <span className="text-yellow-600 font-light">Now</span>
          </h3>
          <form className="text-black" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-control mb-4">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your username"
                className="w-[100%] px-3 outline-none py-2 rounded-md mt-2"
                value={registerData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your lastname"
                className="w-[100%] px-3 outline-none py-2 rounded-md mt-2"
                value={registerData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-[100%] px-3 outline-none py-2 rounded-md mt-2"
                value={registerData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-[100%] px-3 outline-none py-2 rounded-md mt-2 text-black"
                value={registerData.password}
                onChange={handleChange}
              />
            </div>

            <div className="button text-center mt-10">
              <button className="signUp">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
