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

    const user = await UserModel.findOne({ _id: decoded._id }).populate(
      "emails",
    );
    if (!user) {
      throw new Error("User not found");
    }

    //Add the user to the req object
    req.user = user.toJSON();
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: err.name });
  }
  if (err.message === "Receiver not found") {
    return res.status(401).json({ error: err.message });
  }
  return res.status(statusCode).json({ error: err.message });
};
