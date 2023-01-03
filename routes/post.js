const express = require("express");
const router = express.Router();

const postModel = require("../models/Post");
router.get("/", (req, res) => {
  res.json({ msg: "hi from posts route" });
});

router.get("/all", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).send(posts);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllPosts in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newPost = await postModel.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in addPost in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
});

module.exports = router;
