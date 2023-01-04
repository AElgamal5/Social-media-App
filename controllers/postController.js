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
      author: existUser._id,
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
    await User.updateOne(
      { name: req.params.name },
      { $pull: { posts: req.body.postId } }
    );
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
    res.status(200).json({ author: existUser, posts: posts.posts });
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
    // res.status(200).json(posts.sharedPosts);
    res.status(200).json({ author: existUser, posts: posts.sharedPosts });
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
            msg: `The postId ${req.body.postId} does not exist`,
            param: "postId",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const liked = await Post.findOne({
      _id: req.body.postId,
      likes: existUser._id,
    });
    // console.log("--------------", liked);
    if (liked) {
      let err = {
        errors: [
          {
            value: existUser._id,
            msg: `this post is already liked`,
            param: "id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await Post.updateOne(
      { _id: req.body.postId },
      { $push: { likes: existUser._id } }
    );
    res.status(200).json({ msg: "like added tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in addLike in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const share = async (req, res) => {
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
            msg: `The postId ${req.body.postId} does not exist`,
            param: "postId",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const shared = await Post.findOne({
      _id: req.body.postId,
      shares: existUser._id,
    });
    // console.log("--------------", liked);
    if (shared) {
      let err = {
        errors: [
          {
            value: existUser._id,
            msg: `this post is already shared`,
            param: "id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await Post.updateOne(
      { _id: req.body.postId },
      { $push: { shares: existUser._id } }
    );

    await User.updateOne(
      { _id: existUser._id },
      { $push: { sharedPosts: req.body.postId } }
    );
    res.status(200).json({ msg: "post shared tmam" });
  } catch (error) {
    console.log("\x1b[41m", "Gamal : error in share in", "\x1b[0m", __filename);
    console.log("-----------------------------");
    console.log(error);
  }
};

const likers = async (req, res) => {
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
    const existPost = await Post.findById(req.body.postId).populate("likes");
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
    res.status(200).json(existPost.likes);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in likers in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const sharedBy = async (req, res) => {
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
    const existPost = await Post.findById(req.body.postId).populate("shares");
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
    res.status(200).json(existPost.shares);
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in sharedBy in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const removeLike = async (req, res) => {
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
            msg: `The postId ${req.body.postId} does not exist`,
            param: "postId",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const liked = await Post.findOne({
      _id: req.body.postId,
      likes: existUser._id,
    });
    // console.log("--------------", liked);
    if (!liked) {
      let err = {
        errors: [
          {
            value: existUser._id,
            msg: `this post is not liked asln`,
            param: "id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
    await Post.updateOne(
      { _id: req.body.postId },
      { $pull: { likes: existUser._id } }
    );
    res.status(200).json({ msg: "like removed tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in removeLike in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const unShare = async (req, res) => {
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
            msg: `The postId ${req.body.postId} does not exist`,
            param: "postId",
            location: "params",
          },
        ],
      };
      return res.status(200).json(err);
    }
    const shared = await Post.findOne({
      _id: req.body.postId,
      shares: existUser._id,
    });
    // console.log("--------------", liked);
    if (!shared) {
      let err = {
        errors: [
          {
            value: existUser._id,
            msg: `this post is not shared asln`,
            param: "id",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }

    await Post.updateOne(
      { _id: req.body.postId },
      { $pull: { shares: existUser._id } }
    );

    await User.updateOne(
      { _id: existUser._id },
      { $pull: { sharedPosts: req.body.postId } }
    );
    res.status(200).json({ msg: "post unShared tmam" });
  } catch (error) {
    console.log(
      "\x1b[41m",
      "Gamal : error in unShare in",
      "\x1b[0m",
      __filename
    );
    console.log("-----------------------------");
    console.log(error);
  }
};

const all = async (req, res) => {
  const posts = await Post.find().populate("author");
  res.status(200).json(posts);
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllByUserName,
  getAllSharedByUserName,
  addLike,
  share,
  likers,
  sharedBy,
  removeLike,
  unShare,
  all,
};
