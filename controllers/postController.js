const User = require("../models/userModel");
const Post = require("../models/postModel");

const createPost = async (req, res) => {
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
  const newPost = await Post.create({
    author: req.body._id,
    body: req.body.body,
    tags: req.body.tags,
  });
  res.status(201).json(newPost);
};

module.exports = { createPost };
