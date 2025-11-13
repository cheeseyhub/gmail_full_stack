import mongoose from "mongoose";
import jwt from "json-web-token";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mail",
    },
  ],
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
userSchema.statics.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
userSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
