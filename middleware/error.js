const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate Field Value`;
    error = new ErrorResponse(message, 400);
    console.log(error);
  }

  if (err.name === "Validation Error") {
    const message = Object.values(error.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
    console.log(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
