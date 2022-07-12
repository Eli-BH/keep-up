require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token;

  //extract the token from the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //restrict route
  if (!token) {
    return next(
      new ErrorResponse("Not authorized to access this route, no token", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    console.log(req.headers.authorization);
    return next(
      new ErrorResponse("Not authorized to access this route error", 500)
    );
  }
};
