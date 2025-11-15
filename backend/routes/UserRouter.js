import express from "express";
import { body, validationResult } from "express-validator";

import UserModel from "../models/UserModel.js";
const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

UserRouter.post("/login", async (req, res) => {
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
});

UserRouter.post(
  "/create",
  [
    body("name").notEmpty().isString().withMessage("Name must be a string"),
    body("email").notEmpty().isEmail().withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.send(400).json({ errors: result.array() });
    }

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
