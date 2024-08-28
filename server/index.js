import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./dbConnect.js";
import userRouer from "./routes/user.router.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("app is listening at port 4000");
});

// test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Test Route" });
});
app.use(express.json());
app.use(
  cors({
    origin: "https://saas-dashboard-client.vercel.app",
  })
);
app.use(cookieParser());
app.use("/user", userRouer);
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// database
dbConnect();
