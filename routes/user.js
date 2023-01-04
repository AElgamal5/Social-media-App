const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "hi from users route" });
});

router.post("/add", (req, res) => {
  userController.addUser(req, res);
});

router.get("/all", authMiddleware, (req, res) => {
  userController.getAllUsers(req, res);
});

router.post("/search", authMiddleware, (req, res) => {
  userController.getUserLikeName(req, res);
});

router.get("/:name", authMiddleware, (req, res) => {
  userController.getUserByName(req, res);
});

router.post("/:name/addFriendRequest", authMiddleware, (req, res) => {
  userController.addFriendRequest(req, res);
});

router.get("/:name/addFriendRequest", authMiddleware, (req, res) => {
  userController.getAllFriendAdds(req, res);
});

router.post("/:name/removeAddFriendRequest", authMiddleware, (req, res) => {
  userController.removeAddFriendRequest(req, res);
});

router.post("/:name/acceptFriendRequest", authMiddleware, (req, res) => {
  userController.acceptFriendRequest(req, res);
});

router.post("/:name/removeFriendRequest", authMiddleware, (req, res) => {
  userController.removeFriendRequest(req, res);
});

router.get("/:name/friends", authMiddleware, (req, res) => {
  userController.getAllFriends(req, res);
});

router.get("/:name/friendRequests", authMiddleware, (req, res) => {
  userController.getAllFriendRequests(req, res);
});

router.post("/:name/removeFriend", authMiddleware, (req, res) => {
  userController.removeFriend(req, res);
});

router.post("/:name/update", authMiddleware, (req, res) => {
  userController.updateUser(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.get("/:name/logout", authMiddleware, (req, res) => {
  userController.logout(req, res);
});

module.exports = router;
