const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return next(new ErrorResponse("Please fill all fields", 400));
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return next(new ErrorResponse("User already exists", 400));

    let user = await User.create({ username, email, password });

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({
      username,
    });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const passwordMatch = await user.matchPasswords(password);
    if (!passwordMatch) {
      return next(new ErrorResponse("Invalid login", 400));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next();
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
