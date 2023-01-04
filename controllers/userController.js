const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const addUser = async (req, res) => {
  try {
    const checkName = await User.findOne({ name: req.body.name });
    if (checkName) {
      let err = {
        errors: [
          {
            value: req.body.name,
            msg: `The name ${req.body.name} is exist`,
            param: "name",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      let err = {
        errors: [
          {
            value: req.body.email,
            msg: `The email ${req.body.email} is exist`,
            param: "email",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      birthDate: req.body.birthDate,
      city: req.body.city,
      country: req.body.country,
      bio: req.body.bio,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in addUser in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllUsers in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getUserLikeName = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: ".*" + req.body.name + ".*" },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getUserLikeName in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getUserByName = async (req, res) => {
  try {
    const data = await User.findOne({
      name: req.params.name,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getUserByName in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const addFriendRequest = async (req, res) => {
  try {
    const existUser = await User.findById(req.body._id);
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.body._id,
            msg: `The _id ${req.body._id} is exist`,
            param: "_id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await User.updateOne(
      { name: req.params.name },
      { $push: { friendAdds: req.body._id } }
    );
    const sender = await User.findOne({ name: req.params.name });
    await User.updateOne(
      { _id: req.body._id },
      { $push: { friendRequests: sender._id } }
    );
    res.status(200).json({ msg: "friend request added tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in addFriendRequest in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllFriendAdds = async (req, res) => {
  try {
    const data = await User.findOne({ name: req.params.name }).populate(
      "friendAdds"
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllFriendAdds in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const removeAddFriendRequest = async (req, res) => {
  try {
    const existUser = await User.findById(req.body._id);
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.body._id,
            msg: `The _id ${req.body._id} is exist`,
            param: "_id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await User.updateOne(
      { name: req.params.name },
      { $pull: { friendAdds: req.body._id } }
    );
    const sender = await User.findOne({ name: req.params.name });
    await User.updateOne(
      { _id: req.body._id },
      { $pull: { friendRequests: sender._id } }
    );
    res.status(200).json({ msg: "friend request removed tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in removeAddFriendRequest in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const existUser = await User.findById(req.body._id);
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.body._id,
            msg: `The _id ${req.body._id} is exist`,
            param: "_id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await User.updateOne(
      { name: req.params.name },
      { $pull: { friendRequests: req.body._id } }
    );
    await User.updateOne(
      { name: req.params.name },
      { $push: { friends: req.body._id } }
    );
    const sender = await User.findOne({ name: req.params.name });
    await User.updateOne(
      { _id: req.body._id },
      { $pull: { friendAdds: sender._id } }
    );
    await User.updateOne(
      { _id: req.body._id },
      { $push: { friends: sender._id } }
    );
    res.status(200).json({ msg: "friend request accepted tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in acceptFriendRequest in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const removeFriendRequest = async (req, res) => {
  try {
    const existUser = await User.findById(req.body._id);
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.body._id,
            msg: `The _id ${req.body._id} is exist`,
            param: "_id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await User.updateOne(
      { name: req.params.name },
      { $pull: { friendRequests: req.body._id } }
    );
    const sender = await User.findOne({ name: req.params.name });
    await User.updateOne(
      { _id: req.body._id },
      { $pull: { friendAdds: sender._id } }
    );
    res.status(200).json({ msg: "friend request removed tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in removeFriendRequest in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllFriends = async (req, res) => {
  try {
    const data = await User.findOne({ name: req.params.name }).populate(
      "friends"
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllFriends in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllFriendRequests = async (req, res) => {
  try {
    const data = await User.findOne({ name: req.params.name }).populate(
      "friendRequests"
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllFriendRequests in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const removeFriend = async (req, res) => {
  try {
    await User.updateOne(
      { name: req.params.name },
      { $pull: { friends: req.body._id } }
    );
    const sender = await User.findOne({ name: req.params.name });
    await User.updateOne(
      { _id: req.body._id },
      { $pull: { friends: sender._id } }
    );
    res.status(200).json({ msg: "friend removed tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in removeFriend in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const existUser = await User.findOne({ name: req.params.name });
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.params.name,
            msg: `The name ${req.params.name} does not exist`,
            param: "name",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const checkName = await User.findOne({ name: req.body.name });
    if (checkName && existUser.name !== checkName.name) {
      let err = {
        errors: [
          {
            value: req.body.name,
            msg: `The name ${req.body.name} is exist`,
            param: "name",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail && existUser.email !== checkEmail.email) {
      let err = {
        errors: [
          {
            value: req.body.email,
            msg: `The email ${req.body.email} is exist`,
            param: "email",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    if (!req.body.password) {
      await User.updateOne(
        { name: req.params.name },
        {
          name: req.body.name,
          email: req.body.email,
          birthDate: req.body.birthDate,
          city: req.body.city,
          country: req.body.country,
          bio: req.body.bio,
        }
      );
    } else {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      await User.updateOne(
        { name: req.params.name },
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPass,
          birthDate: req.body.birthDate,
          city: req.body.city,
          country: req.body.country,
          bio: req.body.bio,
        }
      );
    }
    res.status(201).json({ msg: "user updated tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in updateUser in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.body.email,
            msg: `The email ${req.body.email} does not exist`,
            param: "email",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }

    if (await bcrypt.compare(req.body.password, existUser.password)) {
      await jwt.sign(
        { name: existUser.name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1d",
        },

        async (err, token) => {
          if (err) {
            res.json(err);
          } else {
            await User.updateOne(
              { email: req.body.email },
              {
                token: token,
              }
            );

            res.json({
              msg: "login tmam",
              token,
              _id: existUser._id,
              name: existUser.name,
              email: existUser.email,
              city: existUser.city,
              country: existUser.country,
              bio: existUser.bio,
            });
          }
        }
      );
    } else {
      let err = {
        errors: [
          {
            value: req.body.password,
            msg: `The password is wrong`,
            param: "password",
            location: "body",
          },
        ],
      };
      res.status(200).json(err);
    }
  } catch (error) {
    console.log("\x1b[41m", "Gamal : error in login in", "\x1b[0m", __filename);
    console.log("-----------------------------");
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    const existUser = await User.findOne({ name: req.params.name });
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.params.name,
            msg: `The name ${req.params.name} does not exist`,
            param: "name",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await User.updateOne({ name: req.params.name }, { token: null });
    res.json({ msg: "logout tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in logout in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserLikeName,
  getUserByName,
  addFriendRequest,
  getAllFriendAdds,
  removeAddFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
  getAllFriends,
  getAllFriendRequests,
  removeFriend,
  updateUser,
  login,
  logout,
};
