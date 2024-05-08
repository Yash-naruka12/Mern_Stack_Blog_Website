import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Dropdown from "./Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import { AuthProvider } from "../../Context/Store";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [active, setActive] = useState("");
  const { setQuery } = AuthProvider();

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="navbar-container w-full bg-[#2e2d2d] px-10 py-3.5 shadow-2xl lg:px-20">
      <div className="flex justify-between items-center text-white">
        <div className="logo text-white">
          <Link to={"/"}>LOGO</Link>
        </div>

        <div className="search-bar relative hidden lg:inline-block">
          <input
            type="text"
            placeholder="Search blog"
            className="py-1 ps-2 pe-10 rounded-md outline-none text-black"
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon
            sx={{
              position: "absolute",
              top: "4px",
              color: "black",
              right: "5px",
            }}
          />
        </div>

        <nav className="hidden lg:inline-block">
          <ul className="flex justify-center items-center gap-10">
            <li>
              <Link
                to={"/"}
                className="font-semibold text-md "
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Dropdown />
            </li>
          </ul>
        </nav>

        {isSidebarOpen ? (
          <div
            className={`sidebar z-40 lg:hidden fixed top-0 right-0 h-[100vh] w-[250px] bg-[#ffffffdc] transition-all duration-500 ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              className="text-black p-2 cursor-pointer"
              onClick={toggleSidebar}
            >
              <CloseIcon />
            </div>

            <nav className="flex justify-center items-center h-[50vh]">
              <ul className="flex flex-col text-center gap-10 text-black">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/"}>About</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/"}>Services</Link>
                </li>
                <li>
                  <Dropdown />
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div
            className="hamburger inline-block lg:hidden transition-all duration-300 cursor-pointer"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
