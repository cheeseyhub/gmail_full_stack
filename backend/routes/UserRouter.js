import express from "express";
import { body } from "express-validator";
import * as userController from "../controllers/userController.js";
const UserRouter = express.Router();

UserRouter.post("/login", userController.login);

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
  userController.createUser,
);

export default UserRouter;
