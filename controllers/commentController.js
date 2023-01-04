const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/CommentModel");

const addComment = async (req, res) => {
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
    const existPost = await Post.findById(req.body.postId);
    if (!existPost) {
      let err = {
        errors: [
          {
            value: req.body.postId,
            msg: `The post id ${req.body.postId} does not exist`,
            param: "post id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const newCom = await Comment.create({
      author: existUser._id,
      body: req.body.body,
      post: req.body.postId,
    });
    await Post.updateOne(
      { _id: req.body.postId },
      { $push: { comments: newCom._id } }
    );
    res.status(201).json(newCom);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in addComment in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const editComment = async (req, res) => {
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
    await Comment.updateOne(
      { _id: req.body.commentId },
      {
        author: req.body.author,
        body: req.body.body,
      }
    );
    res.status(200).json({ msg: "comment updated tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in editComment in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
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
};

module.exports = { addComment, editComment, deleteComment };
