const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
require("dotenv").config();

//app settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);

//DB connection
mongoose.connect(
  process.env.DB_URL,
  () => {
    console.log("\x1b[42m", "Database is connected", "\x1b[0m");
  },
  (e) => console.error(e)
);

//run server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
