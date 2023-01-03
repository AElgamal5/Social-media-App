const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ msg: "hi from users route" });
});

router.post("/add", (req, res) => {
  userController.addUser(req, res);
});

router.get("/all", (req, res) => {
  userController.getAllUsers(req, res);
});

router.post("/search", (req, res) => {
  userController.getUserLikeName(req, res);
});

router.get("/:name", (req, res) => {
  userController.getUserByName(req, res);
});

router.post("/:name/addFriendRequest", (req, res) => {
  userController.addFriendRequest(req, res);
});

router.get("/:name/addFriendRequest", (req, res) => {
  userController.getAllFriendAdds(req, res);
});

module.exports = router;
