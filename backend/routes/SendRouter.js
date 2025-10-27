import express from "express";
const SendRouter = express.Router();

SendRouter.post('/', (req, res) => {
  res.send("hi")
});


export default SendRouter;
