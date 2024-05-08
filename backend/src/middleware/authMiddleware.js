const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const generateToken = async (userId) => {
  return await jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorization access please login" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).send({ message: "Unauthorized access" });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { generateToken, authMiddleware, adminMiddleware };
