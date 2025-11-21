import UserModel from "../models/UserModel.js";
import MailModel from "../models/MailModel.js";

export const mailSend = async (req, res, next) => {
  const { recipent, subject, content } = req.body;

  try {
    const email = await MailModel.create({
      senderId: req.user.id,
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
      const err = new Error("Receiver not found.");
      err.status = 404;
      return next(err);
    }

    return res.status(200).json({ message: "email sent successfully." });
  } catch (error) {
    return next(error);
  }
};
export const mailGet = async (req, res, next) => {
  return res.status(200).json({ emails: req.user.emails });
};
export const mailDelete = async (req, res, next) => {
  const { id } = req.body;

  try {
    const mail = await MailModel.findByIdAndDelete({
      _id: id,
      senderId: req.user.id,
    });
    if (!mail) {
      const error = new Error(
        "Email not found or you are not authorized to delete it .",
      );
      error.status = 404;
      return next(error);
    }
    return res
      .status(200)
      .json({ mail, message: "email deleted successfully." });
  } catch (error) {
    return next(error);
  }
};
