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

userRouer.post("/user/registration", registrationUser);
userRouer.post("/user/activate-user", activateUser);
userRouer.post("/user/login", loginUser);
userRouer.post("/user/getuserdetails", getUserDetails);
userRouer.get("/user/getallusersdetails", getAllUsersDetails);
userRouer.get("/user/logoutuser", logoutUser);
userRouer.post("/user/updateuser", upload.single("avatar"), updateUser);

export default userRouer;
