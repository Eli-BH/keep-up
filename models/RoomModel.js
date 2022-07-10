const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MovieSchema = new mongoose.Schema({
  apiId: Number,
  backdrop: String,
  name: String,
  lastEpisodeAirDate: Date,
  caughtUp: [String],
  notWatching: [String],
  notCaughtUp: [String],
});

const TvSchema = new mongoose.Schema({
  apiId: Number,
  backdrop: String,
  name: String,
  lastEpisodeAirDate: Date,
  caughtUp: [String],
  notWatching: [String],
  notCaughtUp: [String],
});

const RoomModel = mongoose.Schema(
  {
    roomName: String,
    roomMembers: [String],
    roomItems: [String],
    roomAdmin: String,
    roomPassword: {
      type: String,
      required: true,
      minlength: 6,
    },
    movieItems: [MovieSchema],
    TvItems: [TvSchema],
  },
  {
    timestamp: true,
  }
);

const Room = mongoose.model("Room", MovieRoomSchema);

module.exports = Room;
