import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [userBlogs, setUserBlogs] = useState([]);
  const [userUpdateData, setUserUpdateData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) || ""
  );
  const [users, setUsers] = useState();
  const [allUsersBlogs, setAllUsersBlogs] = useState();

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
  );

  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || ""
  );

  const LogoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    getUserBlogs();
    setToken("");
    setUserId("");
  };

  async function allUserBlogs() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/user/all-blogs"
      );

      setTimeout(() => {
        setAllBlogs(data.allData);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  async function allUsers() {
    try {
      const { data } = await axios.get("http://localhost:5000/user", {
        headers: { Authorization: token },
      });
      const usersWithId = data.users.map((user) => ({ ...user, id: user._id }));
      setUsers(usersWithId);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletUser(deleteId) {
    try {
      await axios.delete(`http://localhost:5000/delete/user/${deleteId}`, {
        headers: { Authorization: token },
      });
      allUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function deletUserBlog(deleteId) {
    try {
      await axios.delete(`http://localhost:5000/delete/blog/${deleteId}`, {
        headers: { Authorization: token },
      });
      allUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllUserBlogs() {
    try {
      const { data } = await axios.get("http://localhost:5000/blogs", {
        headers: { Authorization: token },
      });
      setAllUsersBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkAdmin() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/find-user",
        { headers: { Authorization: token } }
      );
      localStorage.setItem("isAdmin", JSON.stringify(data.user.isAdmin));
      setIsAdmin(data.user.isAdmin);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserBlogs() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-blog",
        { headers: { Authorization: token } }
      );
      setUserBlogs(data.getUserBlogData);
    } catch (error) {
      console.log(error);
    }
  }

  function getUpdateData(dataId) {
    const dataBlog = userBlogs.find((data) => data._id === dataId);
    setUserUpdateData(dataBlog);
  }

  useEffect(() => {
    allUserBlogs();
    if (token) {
      getUserBlogs();
      checkAdmin();
      allUsers();
      getAllUserBlogs();
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        token,
        setToken,
        LogoutUser,
        userId,
        setUserId,
        loading,
        setLoading,
        setAllBlogs,
        allBlogs,
        query,
        setQuery,
        userBlogs,
        getUserBlogs,
        allUserBlogs,
        getUpdateData,
        userUpdateData,
        setUserUpdateData,
        isAdmin,
        setIsAdmin,
        users,
        deletUser,
        allUsersBlogs,
        deletUserBlog,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const AuthProvider = () => {
  return useContext(MyContext);
};
