import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
export const tokenExtraction = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const parts = req.headers["authorization"].split(" ");
  if (parts.length != 2) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    return res.status(401).json({ message: "Invalid token" });
  }
  req.token = token;

  next();
};
export const tokenVerification = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.SECRET);
    console.log(decoded);

    const user = await UserModel.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }

  return user;
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({error:err.message});
  }
  res
    .status(statusCode)
    .json({ status: "error", message: "Internal server error" });
};
