const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    let err = {
      errors: [
        {
          value: token,
          msg: `The token is required`,
          param: "token",
          location: "head",
        },
      ],
    };
    return res.status(200).json(err);
  } else {
    const user = await User.findOne({ token: token });
    if (!user) {
      let err = {
        errors: [
          {
            value: token,
            msg: `You have to login again`,
            param: "token",
            location: "body",
          },
        ],
      };
      return res.status(200).json(err);
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(200).json({
      errors: [
        {
          value: token,
          msg: `You have to login again`,
          param: "token",
          location: "body",
        },
      ],
    });
  }
  return next();
};

module.exports = verifyToken;
