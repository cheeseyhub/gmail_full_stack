import express from "express";
import UserModel from "../models/UserModel.js";
import MailModel from "../models/MailModel.js";
import * as middlewares from "../middlewares/middlewares.js";
const MailRouter = express.Router();

MailRouter.post(
  "/",
  [middlewares.tokenExtraction, middlewares.tokenVerification],
  (req, res, next) => {
    return res.status(200).json({ emails: req.user.emails });
  },
);
MailRouter.post(
  "/send",
  [middlewares.tokenExtraction, middlewares.tokenVerification],
  async (req, res) => {
    const { recipent, subject, content } = req.body;

    const email = await MailModel.create({
      sender: req.user.email,
      recipent,
      subject,
      content,
    });

    //Todo: Handle error in finding the receiver;
    const receiver = await UserModel.findOneAndUpdate(
      { email: recipent },
      { $push: { emails: email._id } },
    );
    if (!receiver) {
      throw new Error("Receiver not found");
    }

    return res.status(200).json({ message: "email sent successfully." });
  },
);
export default MailRouter;
