import express from "express";
import mongoose from "mongoose";

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to the database.");
  });

app.listen(port, () => {
  console.log(`Server is listening on the port  ${port}`);
});
