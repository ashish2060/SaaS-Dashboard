import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export default dbConnect;
