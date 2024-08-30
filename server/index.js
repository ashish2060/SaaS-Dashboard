import app from "./app.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import dbConnect from "./utils/dbConnect.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: ["https://saas-dashboard-client.vercel.app"],
  })
);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use(fileUpload());

app.listen(process.env.PORT, () => {
  console.log("app is listening at port 4000");
});

// database
dbConnect();

// test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Test Route" });
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
