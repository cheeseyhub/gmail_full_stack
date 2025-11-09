import express from "express";
const MailRouter = express.Router();

MailRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

export default MailRouter;
