import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Register from "../../Pages/Register/Register";
import "../../App.css";
import Login from "../../Pages/Login/Login";
import CreateBlog from "../Createblog/CreateBlog";
import Home from "../Home/Home";
import ProtectRoute from "../ProtectRoute/ProtectRoute";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import SignleBlog from "../SignleBlog/SignleBlog";
import MyBlogs from "../Dashboard/MyBlogs";
import UpdateBlog from "../UpdateBlog/UpdateBlog";
import ChangePassword from "../../Pages/ChangePassword/ChangePassword";
import AdminRoute from "../../Admin/AdminRoute";
import Admin from "../../Admin/Admin";
import GetAllUsers from "../../Admin/GetAllUsers";
import GetAllBlogs from "../../Admin/GetAllBlogs";
import Footer from "../../Pages/Footer/Footer";
import { AuthProvider } from "../../Context/Store";

const Layout = () => {
  const { isAdmin } = AuthProvider();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ChangePassword />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/user" element={<ProtectRoute />}>
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="my-blogs" element={<MyBlogs />} />
          <Route path="blog/:id" element={<SignleBlog />} />
          <Route path="update-blog" element={<UpdateBlog />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="" element={<Admin />} />
          <Route path="users" element={<Admin children={<GetAllUsers />} />} />
          <Route path="blogs" element={<Admin children={<GetAllBlogs />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
