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
      userName: existUser.name,
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
    const existCom = await Comment.findById(req.body.commentId);
    if (!existCom) {
      let err = {
        errors: [
          {
            value: req.body.commentId,
            msg: `The commentId ${req.body.commentId} does not exist`,
            param: "commentId",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await Comment.remove({ _id: req.body.commentId });
    await Post.updateOne(
      { _id: existCom.post },
      { $pull: { comments: existCom._id } }
    );
    res.status(200).json({ msg: "comment deleted tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in deleteComment in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const getAllByPostId = async (req, res) => {
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
    const coms = await Post.findById(req.body.postId).populate("comments");
    res.status(200).json(coms.comments);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in getAllByPostId in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

module.exports = { addComment, editComment, deleteComment, getAllByPostId };
