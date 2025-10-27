import express from "express";
import GetRouter from "./routes/GetRouter.js";
import SendRouter from "./routes/SendRouter.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req, res, next) => {
  res.send("This is the main page")

})
app.use("/get", GetRouter);
app.use("/send", SendRouter);

app.listen(port, () => {
  console.log(`Server is listening on the port  ${port}`);
});
