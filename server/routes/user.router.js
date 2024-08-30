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

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/getuserdetails", getUserDetails);
userRouter.get("/getallusersdetails", getAllUsersDetails);
userRouter.get("/logoutuser", logoutUser);
userRouter.post("/updateuser", upload.single("avatar"), updateUser);

export default userRouter;
