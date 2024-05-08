const bcrypt = require("bcrypt");

const hashPassword = async (userPassword) => {
  const saltRound = 10;
  return await bcrypt.hash(userPassword, saltRound);
};

const comparePassword = async (loginPassword, hashedPassword) => {
  return await bcrypt.compare(loginPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
