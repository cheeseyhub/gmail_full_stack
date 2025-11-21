import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const tokenExtraction = (req, res, next) => {
  if (!req.headers.authorization) {
    const err = new Error("Invalid token");
    err.code = 401;
    return next(err);
  }
  const parts = req.headers["authorization"].split(" ");
  if (parts.length != 2) {
    const err = new Error("Invalid token");
    err.code = 401;
    return next(err);
  }
  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    const err = new Error("Invalid token");
    err.code = 401;
    return next(err);
  }
  req.token = token;

  next();
};
export const tokenVerification = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.SECRET);

    const user = await UserModel.findOne({ _id: decoded._id }).populate(
      "emails",
    );
    if (!user) {
      const err = new Error("User not found");
      err.code = 404;
      return next(err);
    }

    //Add the user to the req object
    req.user = user.toJSON();
    next();
  } catch (error) {
    error.code = 401;
    return next(error);
  }
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.code || 500;
  return res.status(statusCode).json({ error: err.message });
};
