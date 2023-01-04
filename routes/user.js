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

router.post("/:name/removeAddFriendRequest", (req, res) => {
  userController.removeAddFriendRequest(req, res);
});

router.post("/:name/acceptFriendRequest", (req, res) => {
  userController.acceptFriendRequest(req, res);
});

router.post("/:name/removeFriendRequest", (req, res) => {
  userController.removeFriendRequest(req, res);
});

router.get("/:name/friends", (req, res) => {
  userController.getAllFriends(req, res);
});

router.get("/:name/friendRequests", (req, res) => {
  userController.getAllFriendRequests(req, res);
});

router.post("/:name/removeFriend", (req, res) => {
  userController.removeFriend(req, res);
});

router.post("/:name/update", (req, res) => {
  userController.updateUser(req, res);
});

module.exports = router;
