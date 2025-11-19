import UserModel from "../models/UserModel.js";
import { validationResult } from "express-validator";
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).send({ error: "User not found" });

  const isPasswordValid = await UserModel.comparePassword(
    password,
    user.password,
  );

  if (!isPasswordValid) {
    return res.status(400).send({ error: "Invalid password" });
  }

  const token = await UserModel.generateAuthToken(user._id);

  res.status(200).send({ message: "Login successful", token: token });
};

export const createUser = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { name, email, password } = req.body;
  const encryptedPassword = await UserModel.encryptPassword(password);
  const user = await UserModel.create({
    name: name,
    email: email,
    password: encryptedPassword,
  });
  res.status(201).send("User Created Successfully");
};
