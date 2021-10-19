const asyncHandler = require("express-async-handler"); //handle all of the error in app
const Registration = require("../model/user");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const userExists = await Registration.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await Registration.create({
    username,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      password: user.password,
      type: user.type,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});


const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await Registration.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      password: user.password,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

module.exports = { registerUser, authUser };
