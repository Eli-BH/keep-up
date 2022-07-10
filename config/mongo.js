const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/keepUp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("mongodb connected");
};

module.exports = connectDB;
