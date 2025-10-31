import express from "express";
import GetRouter from "./routes/GetRouter.js";
import SendRouter from "./routes/SendRouter.js";
import mongoose from "mongoose";
import { loadEnvFile } from "node:process";
import LoginRouter from "./routes/LoginRouter.js";

loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("This is the main page");
});
app.use("/get", GetRouter);
app.use("/send", SendRouter);
app.use("/login", LoginRouter);

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
