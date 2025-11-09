import express from "express";
import { body } from "express-validator";

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
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  (req, res, next) => {
    const { email, password } = req.body;
    res.send("User created successfully");
  },
);

export default UserRouter;
