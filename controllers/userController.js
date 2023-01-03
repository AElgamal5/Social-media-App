const User = require("../models/userModel");

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
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
            value: req.body.req.body._id,
            msg: `The _id ${req.body.req.body._id} is exist`,
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
  const data = await User.findOne({ name: req.params.name }).populate(
    "friendAdds"
  );
  res.status(200).json(data);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserLikeName,
  getUserByName,
  addFriendRequest,
  getAllFriendAdds,
};
// let err = {
//   errors: [
//     {
//       value: req.body.code,
//       msg: `The code ${req.body.code} is exist`,
//       param: "code",
//       location: "body",
//     },
//   ],
// };
// res.status(200).json(err);

// const user = await User.updateOne(
//   { name: req.params.name },
//   { $pull: { friendAdds: req.body._id } }
// );
