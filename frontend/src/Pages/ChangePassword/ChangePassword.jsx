import React, { useState } from "react";
import forgetImage from "../../Components/assets/forget.webp";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [forgetPassword, setForgetPassword] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForgetPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/change-password",
        { ...forgetPassword }
      );
      if (data.success) {
        toast.success(data.message);
        setForgetPassword({
          email: "",
          currentPassword: "",
          newPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="login-container h-[100vh] w-[100vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center h-[100%]">
        <div className="login-image">
          <img src={forgetImage} alt="loginimage" />
        </div>

        <div className="login-form">
          <h3
            className="text-white text-center text-2xl lg:text-5xl mb-10"
            style={{
              fontFamily: "fantasy",
            }}
          >
            Forget <span className="text-yellow-600 font-light">Password</span>
          </h3>
          <form onSubmit={(e) => handleChangePassword(e)}>
            <div className="login-control mb-5">
              <label htmlFor="userName" className="text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-[100%] px-3 py-2 rounded-md mt-2 outline-none"
                value={forgetPassword.email}
                onChange={handleChange}
              />
            </div>
            <div className="login-control mb-5">
              <label htmlFor="email" className="text-white">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter your current password"
                className="w-[100%] px-3 py-2 rounded-md mt-2 outline-none"
                value={forgetPassword.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="login-control mb-5">
              <label htmlFor="userName" className="text-white">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new password"
                className="w-[100%] px-3 py-2 rounded-md mt-2 outline-none"
                value={forgetPassword.newPassword}
                onChange={handleChange}
              />
            </div>

            <Link
              className="text-white text-right m-0 p-0 font-extralight underline"
              to={"/login"}
            >
              Login Now
            </Link>

            <div className="login-control text-center mt-5">
              <button className="text-white border px-12 py-2 rounded-md hover:bg-[#fff] hover:text-black font-semibold transition-all duration-500">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
