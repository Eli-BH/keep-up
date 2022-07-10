require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/mongo");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//rejection log
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
