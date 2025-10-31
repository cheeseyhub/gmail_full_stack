import express from "express";
const LoginRouter = express.Router();

LoginRouter.get("/", (req, res) => {
  res.send("Login route");
});
LoginRouter.post("/", (req, res) => {
  res.send("Login route");
});

export default LoginRouter;
