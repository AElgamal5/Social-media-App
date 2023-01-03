const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    friendAdds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    sharedPosts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

//model
module.exports = mongoose.model("User", userSchema);
