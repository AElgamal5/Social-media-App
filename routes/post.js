const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const postController = require("../controllers/postController");

router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "hi from posts route" });
});

router.post("/:name/create", authMiddleware, async (req, res) => {
  postController.createPost(req, res);
});

module.exports = router;
