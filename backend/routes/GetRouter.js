import express from "express";
const GetRouter = express.Router();




GetRouter.get("/", (req, res, next) => {
  res.send("This is some message.");
})


export default GetRouter;


