const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const commentController = require("../controllers/commentController");

router.post("/:name/add", authMiddleware, (req, res) => {
  commentController.addComment(req, res);
});

router.post("/:name/edit", authMiddleware, (req, res) => {
  commentController.editComment(req, res);
});

module.exports = router;
