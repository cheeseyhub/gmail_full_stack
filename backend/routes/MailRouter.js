import express from "express";
import UserModel from "../models/UserModel.js";
import * as middlewares from "../middlewares/middlewares.js";
const MailRouter = express.Router();

MailRouter.post(
  "/check",
  [middlewares.tokenExtraction, middlewares.tokenVerification],
  (req, res, next) => {
    return res.status(200).json({ message: "Working till here" });
  },
);
export default MailRouter;
