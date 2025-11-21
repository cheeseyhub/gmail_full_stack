import express from "express";
import * as middlewares from "../middlewares/middlewares.js";
import * as mailController from "../controllers/mailController.js";
const MailRouter = express.Router();

MailRouter.post(
  "/",
  [middlewares.tokenExtraction, middlewares.tokenVerification],
  mailController.mailGet,
);
MailRouter.post(
  "/send",
  [middlewares.tokenExtraction, middlewares.tokenVerification],
  mailController.mailSend,
);
MailRouter.post(
  "/delete",
  [middlewares.tokenExtraction, middlewares.tokenVerification],
  mailController.mailDelete,
);
export default MailRouter;
