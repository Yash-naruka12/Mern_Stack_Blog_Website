// import express --------------------------------------------->
const express = require("express");

// store express in app variable here ------------------------------------------>
const app = express();

// import cors ----------------------------------------------------------->
const cors = require("cors");

// import file upload
const fileUpload = require("express-fileupload");

// import dotenv ------------------------------------------------------------>
const dotenv = require("dotenv");
const dbConnection = require("./src/database/db");
const userRouter = require("./src/router/userRouter");
const blogRouter = require("./src/router/blogRouter");
const adminRouter = require("./src/admin/adminRouter");

// generate data in json format ------------------------------------------->
app.use(express.json());

// call dotenv file here ------------------------------->
dotenv.config();

app.get("/", (req, res) => {
  return res.send("Welcome to blog webpage");
});

app.use(cors());

app.use(fileUpload());

const PORT = process.env.PORT;

// user route ------------------------------------>
app.use("/api/v1/user", userRouter);

// create blog ------------------------------------------------>
app.use("/api/user", blogRouter);
app.use("/public", express.static("./src/public"));

// admin route -------------------------------------------------------->
app.use("/", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port : ${PORT}`);
});

// call database connection function here ------------------------------------->
dbConnection();
