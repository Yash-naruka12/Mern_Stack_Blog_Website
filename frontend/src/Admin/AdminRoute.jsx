import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "../Context/Store";

const AdminRoute = () => {
  const { isAdmin } = AuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, []);
  return <div>{isAdmin && <Outlet />}</div>;
};

export default AdminRoute;
