import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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

userSchema.statics.generateAuthToken = function (id) {
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
  const token = jwt.sign({ _id: id, exp: expirationTime }, process.env.SECRET);
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
userSchema.statics.verifyToken = async function (token) {
  //Todo:Handle token expiration;
  const decoded = jwt.verify(token, process.env.SECRET);

  //Todo:Handle finding user with the token;
  const user = await this.findOne(decoded._id);

  console.log(user);
};
userSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
