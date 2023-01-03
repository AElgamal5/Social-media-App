const express = require("express");
const mongoose = require("mongoose");

const postsRouter = require("./routes/post");
require("dotenv").config();

//app settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/post", postsRouter);

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
