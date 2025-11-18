import express from "express";
import mongoose from "mongoose";

//Registering Models
import MailModel from "./models/MailModel.js";
import UserModel from "./models/UserModel.js";

import * as middlewares from "./middlewares/middlewares.js";

import UserRouter from "./routes/UserRouter.js";
import MailRouter from "./routes/MailRouter.js";

//Loading env file;
import { loadEnvFile } from "node:process";
loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("This is the main page");
});
app.use("/user", UserRouter);
app.use("/mail", MailRouter);

app.all("/*splat", (req, res, next) => {
  const error = new Error(`Page not found ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(middlewares.errorHandler);

if (process.env.NODE_ENV === "production") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting to the database.");
    });
} else if (process.env.NODE_ENV === "development") {
  mongoose
    .connect(process.env.MONGO_DEV_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting to the database.");
    });
}

app.listen(port, () => {
  console.log(`Server is listening on the port  ${port}`);
});
