import React, { useState } from "react";
import loginImage from "../../Components/assets/login.png";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthProvider } from "../../Context/Store";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setToken, setUserId, setLoading } = AuthProvider();

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { ...loginData }
      );
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("userId", JSON.stringify(data.userId));
        setToken(data.token);
        setUserId(data.userId);
        setLoginData({
          userName: "",
          email: "",
          password: "",
        });
        navigate("/");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        toast.error("User login failed please try again");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="login-container h-screen w-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center h-[100%]">
        <div className="login-image">
          <img src={loginImage} alt="loginimage" />
        </div>

        <div className="login-form">
          <h3
            className="text-white text-center text-2xl lg:text-5xl mb-10"
            style={{
              fontFamily: "fantasy",
            }}
          >
            Login <span className="text-yellow-600 font-light">Now</span>
          </h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="login-control mb-5">
              <label htmlFor="userName" className="text-white">
                Usename
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter your username"
                className="w-[100%] px-3 py-2 rounded-md mt-2 outline-none"
                value={loginData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="login-control mb-5">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-[100%] px-3 py-2 rounded-md mt-2 outline-none"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <div className="login-control mb-5">
              <label htmlFor="userName" className="text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-[100%] px-3 py-2 rounded-md mt-2 outline-none"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            <Link
              className="text-white text-right m-0 p-0 font-extralight underline"
              to={"/forget-password"}
            >
              Change password
            </Link>

            <div className="login-control text-center mt-5">
              <button className="text-white border px-12 py-2 rounded-md hover:bg-[#fff] hover:text-black font-semibold transition-all duration-500">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
