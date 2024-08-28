import express from "express";
import {
  activateUser,
  getAllUsersDetails,
  getUserDetails,
  loginUser,
  logoutUser,
  registrationUser,
  updateUser,
} from "../controller/user.controller.js";
import upload from "../utils/upload.js";

const userRouer = express.Router();

userRouer.post("/registration", registrationUser);
userRouer.post("/activate-user", activateUser);
userRouer.post("/login", loginUser);
userRouer.post("/getuserdetails", getUserDetails);
userRouer.get("/getallusersdetails", getAllUsersDetails);
userRouer.get("/logoutuser", logoutUser);
userRouer.post("/updateuser", upload.single("avatar"), updateUser);

export default userRouer;
