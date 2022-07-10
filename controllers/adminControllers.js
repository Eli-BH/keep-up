const User = require("../models/UserModel");
const axios = require("axios");
const ErrorResponse = require("../utils/errorResponse");
const TvRoom = require("../models/TvRoomModel");

exports.tvSearch = async (req, res, next) => {
  try {
    // const { email } = req.user;

    const { roomName } = req.body;

    const { data } = await axios.get("https://api.themoviedb.org/3/search/tv", {
      params: {
        api_key: "0ca4f16446cc1bca4c690abae99b5e52",
        language: "en-US",
        include_adult: true,
        query: roomName,
      },
    });

    if (data.total_results === 0)
      return next(new ErrorResponse("Show not found", 404));

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.createTvRoom = async (req, res, next) => {
  const { id, password, roomName } = req.body;
  const { username } = req.user;
  try {
    const existingRoom = await TV.findOne({
      roomName,
    });

    const newRoom = await TV.create({
      roomName: data.name,
      roomMembers: [username],
      roomPassword: password,
      roomType: "tv",
      adminName: username,
    });

    res.json({ success: true, data: newRoom });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, 400));
  }
};
