const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const postController = require("../controllers/postController");

router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "hi from posts route" });
});

router.post("/:name/create", authMiddleware, (req, res) => {
  postController.createPost(req, res);
});

router.put("/:name/update", authMiddleware, (req, res) => {
  postController.editPost(req, res);
});

router.delete("/:name/delete", authMiddleware, (req, res) => {
  postController.deletePost(req, res);
});

router.get("/:name", authMiddleware, (req, res) => {
  postController.getAllByUserName(req, res);
});

router.get("/:name/shared", authMiddleware, (req, res) => {
  postController.getAllSharedByUserName(req, res);
});

router.post("/:name/like", authMiddleware, (req, res) => {
  postController.addLike(req, res);
});

router.post("/:name/share", authMiddleware, (req, res) => {
  postController.share(req, res);
});

module.exports = router;
