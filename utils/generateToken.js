const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/keys.env" });

const generateToken = (id) => {
  return jwt.sign({ id }, "" + `${process.env.JWT_SECRET}`, {
    expiresIn: "1d",
  });
};
module.exports = generateToken;
