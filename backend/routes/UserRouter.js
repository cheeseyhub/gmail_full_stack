import express from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";

import UserModel from "../models/UserModel.js";
const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});
UserRouter.post(
  "/",

  (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
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

    //Encrypting password using bycrpt
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });
    console.log(user.name, user.email);
    res.status(201).send("User Created Successfully");
  },
);

export default UserRouter;
