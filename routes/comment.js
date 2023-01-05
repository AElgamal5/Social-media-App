const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const commentController = require("../controllers/commentController");

router.post("/:name/add", authMiddleware, (req, res) => {
  commentController.addComment(req, res);
});

router.put("/:name/edit", authMiddleware, (req, res) => {
  commentController.editComment(req, res);
});

router.delete("/:name/delete", authMiddleware, (req, res) => {
  commentController.deleteComment(req, res);
});

router.post("/:name/post", authMiddleware, (req, res) => {
  commentController.getAllByPostId(req, res);
});

module.exports = router;
