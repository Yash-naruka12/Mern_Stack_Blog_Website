import React from "react";
import { AuthProvider } from "../../Context/Store";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoute = () => {
  const { token } = AuthProvider();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div>{token && <Outlet />}</div>;
};

export default ProtectRoute;
