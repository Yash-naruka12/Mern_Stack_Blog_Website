const express = require("express");
const {
  userRegister,
  userLogin,
  changePassword,
  findUser,
} = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/change-password", changePassword);
userRouter.get("/find-user", authMiddleware, findUser);

module.exports = userRouter;
