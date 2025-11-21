import UserModel from "../models/UserModel.js";
import MailModel from "../models/MailModel.js";

export const mailSend = async (req, res) => {
  const { recipent, subject, content } = req.body;

  const email = await MailModel.create({
    sender: req.user.email,
    recipent,
    subject,
    content,
  });

  const receiver = await UserModel.findOneAndUpdate(
    { email: recipent },
    { $push: { emails: email._id } },
  );
  if (!receiver) {
    throw new Error("Receiver not found");
  }

  return res.status(200).json({ message: "email sent successfully." });
};
export const mailGet = async (req, res, next) => {
  return res.status(200).json({ emails: req.user.emails });
};
export const mailDelete = async (req, res) => {
  const { id } = req.body;

  if (!req.user.emails.some((email) => email._id.toString() === id)) {
    throw new Error(
      "The mail doesn't exist or you are not authorized to delete it.",
    );
  }

  const mail = await MailModel.findByIdAndDelete(id);
  if (!mail) {
    throw new Error("Mail not found");
  }
  return res.status(200).json({ mail, message: "email deleted successfully." });
};
