import UserModel from "../models/UserModel.js";
import { validationResult } from "express-validator";
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    const isPasswordValid = await UserModel.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      const err = new Error("Invalid Password");
      err.status = 401;
      return next(err);
    }

    const token = await UserModel.generateAuthToken(user._id);
    res.status(200).send({ message: "Login successful", token: token });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  const result = validationResult(req);

  try {
    if (!result.isEmpty()) {
      const err = new Error("name,email, and password fields are required.");
      err.code = 400;
      return next(err);
    }

    const { name, email, password } = req.body;
    const encryptedPassword = await UserModel.encryptPassword(password);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });
    res.status(201).json({ message: "User Created Successfully", user: user });
  } catch (error) {
    return next(error);
  }
};
