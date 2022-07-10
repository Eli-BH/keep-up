const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MovieModel = new mongoose.Schema({
  apiId: Number,
  backdrop: String,
  name: String,
  lastEpisodeAirDate: Date,
  caughtUp: [String],
  notWatching: [String],
  notCaughtUp: [String],
});

const MovieRoomSchema = new mongoose.Schema(
  {
    roomName: String,
    roomMembers: [String],
    roomItems: [String],
    roomPassword: {
      type: String,
      required: true,
      minlength: 6,
    },
    roomType: String,
    mediaList: [MovieModel],
    //roomTheme
  },
  { timestamps: true }
);

MovieRoomSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

MovieRoomSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const TvRoom = mongoose.model("TV", MovieRoomSchema);

module.exports = TvRoom;
