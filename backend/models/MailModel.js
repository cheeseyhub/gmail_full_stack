import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  recipent: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const MailModel = mongoose.model("Mail", mailSchema);

export default MailModel;
