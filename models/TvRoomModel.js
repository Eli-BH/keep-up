const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TvShowSchema = new mongoose.Schema({
  apiId: Number,
  backdrop: String,
  name: String,
  lastEpisodeAirDate: Date,
  caughtUp: [String],
  notWatching: [String],
  notCaughtUp: [String],
});

const TvRoomSchema = new mongoose.Schema(
  {
    roomName: String,
    roomMembers: [String],

    roomPassword: {
      type: String,
      required: true,
      minlength: 6,
    },
    roomType: String,
    mediaList: [TvShowSchema],
    adminName: String,

    //roomTheme
  },
  { timestamps: true }
);

TvRoomSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

TvRoomSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const TvRoom = mongoose.model("TvRoom", TvRoomSchema);

module.exports = TvRoom;
