import express from "express";
import { body } from "express-validator";

import UserModel from "../models/UserModel.js";
const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

UserRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],

  async (req, res) => {
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

    res.status(200).send({ message: "Login successful" });
  },
);

UserRouter.post(
  "/create",
  [
    body("name").isString().withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res, next) => {
    const { name, email, password } = req.body;
    const encryptedPassword = await UserModel.encryptPassword(password);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });
    res.status(201).send("User Created Successfully");
  },
);

export default UserRouter;
