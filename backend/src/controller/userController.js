const { generateToken } = require("../middleware/authMiddleware");
const User = require("../model/userModel");
const { hashPassword, comparePassword } = require("../secure/hashPassword");

// user register -------------------------------------------------------------------->
const userRegister = async (req, res) => {
  try {
    const { userName, lastName, email, password } = req.body;

    if (!userName || !lastName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all register required fields",
      });
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(400).send({
        success: false,
        message: "Email already register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      userName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .send({ success: true, message: "User register successfully", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error please try again",
    });
  }
};

// user login -------------------------------------------------------------------->

const userLogin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all login required fields",
      });
    }

    const userRegister = await User.findOne({ email });

    if (!userRegister) {
      return res
        .status(400)
        .send({ success: false, message: "User not found please register" });
    }

    const matchPassword = await comparePassword(
      password,
      userRegister.password
    );

    if (!matchPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide valid username and password",
      });
    }

    const token = await generateToken(userRegister._id);

    return res.status(200).send({
      success: true,
      message: "User login successfully",
      token,
      userId: userRegister._id,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error please try again",
    });
  }
};

// user change password -------------------------------------------------------------------->
const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found. Please provide a valid email.",
      });
    }

    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).send({
        success: false,
        message:
          "Current password is incorrect. Please provide a valid password.",
      });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await User.updateOne({ email }, { password: hashedNewPassword });

    return res
      .status(200)
      .send({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).send({ message: "User not found" });
    }

    const user = await User.findById(userId);

    return res.status(200).send({
      message: "User found",
      user: {
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};

module.exports = { userRegister, userLogin, changePassword, findUser };
