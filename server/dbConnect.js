import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export default dbConnect;
