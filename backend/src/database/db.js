const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Server is connected successfully");
  } catch (error) {
    console.log("Server connection failed please try again");
  }
};

module.exports = dbConnection;
