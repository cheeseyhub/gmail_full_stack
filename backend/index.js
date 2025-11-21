import express from "express";

//Registering Models
import MailModel from "./models/MailModel.js";
import UserModel from "./models/UserModel.js";

import * as middlewares from "./middlewares/middlewares.js";

import UserRouter from "./routes/UserRouter.js";
import MailRouter from "./routes/MailRouter.js";
import connectionToDB from "./db.js";

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
  return next(error);
});

app.use(middlewares.errorHandler);

connectionToDB();

app.listen(port, () => {
  console.log(`Server is listening on the port  ${port}`);
});
