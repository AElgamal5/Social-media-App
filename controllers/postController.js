const User = require("../models/userModel");
const Post = require("../models/postModel");

const createPost = async (req, res) => {
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
    const newPost = await Post.create({
      author: req.body._id,
      body: req.body.body,
      tags: req.body.tags,
    });
    await User.updateOne(
      { name: req.params.name },
      { $push: { posts: newPost._id } }
    );
    res.status(201).json(newPost);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in createPost in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.body.postId },
      {
        author: req.body.id,
        body: req.body.body,
        tags: req.body.tags,
      }
    );
    res.status(200).json({ msg: "post updated tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in editPost in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    oldPost = Post.findById(req.body.postId);
    if (!oldPost) {
      let err = {
        errors: [
          {
            value: req.body.postId,
            msg: `The id ${req.body.postId} does not exist`,
            param: "id",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await Post.remove({ _id: req.body.postId });
    res.status(200).json({ msg: "post deleted tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in deletePost in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllByUserName = async (req, res) => {
  try {
    const existUser = await User.findOne({ name: req.params.name });
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.params.name,
            msg: `The name ${req.params.name} does not exist`,
            param: "name",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const posts = await existUser.populate("posts");
    res.status(200).json(posts.posts);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllByUserName in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllSharedByUserName = async (req, res) => {
  try {
    const existUser = await User.findOne({ name: req.params.name });
    if (!existUser) {
      let err = {
        errors: [
          {
            value: req.params.name,
            msg: `The name ${req.params.name} does not exist`,
            param: "name",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const posts = await existUser.populate("sharedPosts");
    res.status(200).json(posts.sharedPosts);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllSharedByUserName in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const addLike = async (req, res) => {
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
  const existPost = await Post.findById(req.body.postId);
  if (!existPost) {
    let err = {
      errors: [
        {
          value: req.body.postId,
          msg: `The postId ${req.body.postId} does not exist`,
          param: "postId",
          location: "params",
        },
      ],
    };
    return res.status(200).json(err);
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllByUserName,
  getAllSharedByUserName,
};
