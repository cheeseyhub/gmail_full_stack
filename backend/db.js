import mongoose from "mongoose";
export default function connectionToDB() {


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
}

