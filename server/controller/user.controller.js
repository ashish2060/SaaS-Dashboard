import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path, { dirname } from "path";
import sendMail from "../utils/sendMail.js";
import { fileURLToPath } from "url";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export const registrationUser = async (req, res, next) => {
  try {
    const { name, email, password, age, gender } = req.body;
    console.log(req.body);

    const isEmailExists = await userModel.findOne({ email });

    if (isEmailExists) {
      return res.json({
        success: false,
        message: "Email already exits",
      });
    }

    const user = {
      name,
      email,
      password,
      age,
      gender,
    };

    const activationToken = createActivationToken(user);

    const { activationCode } = activationToken;
    const data = { user: user.name, activationCode };

    // filepath

    await sendMail({
      email,
      subject: "Activation your account",
      template: "activation-mail.ejs",
      data,
    });

    return res.status(201).json({
      success: true,
      message: `Please check your email ${user.name} to active your account`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while registering",
      error,
    });
  }
};

// createActiveToken and activationCode
function createActivationToken(user) {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  return { activationCode, token };
}

// activate user or validate user
export const activateUser = async (req, res, next) => {
  try {
    const { activation_code, activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.JWT_SECRET);

    if (newUser.activationCode != activation_code) {
      return res.json({
        success: false,
        message: "activation code doesn't match",
      });
    }

    const { name, email, password, age, gender } = newUser.user;

    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.json({
        success: false,
        message: "user already exits",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      age,
      gender,
      isVerified: true,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error while validating user",
    });
  }
};

// user login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Invalid data",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Please register first",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    sendToken({ user, statusCode: 200, res });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error while login",
    });
  }
};

// getuser Details
export const getUserDetails = async (req, res) => {
  try {
    const { accessToken } = req.body;
    const { id } = jwt.verify(
      JSON.parse(accessToken),
      process.env.ACCESS_TOKEN
    );

    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error in get user",
    });
  }
};

export const getAllUsersDetails = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error while fetching all users",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
    return res.json({
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Error while logout" });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const updateData = req?.body;
    const avatar = req?.file;
    const token = JSON.parse(req.headers["accesstoken"]);

    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!id) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }

    let uploadData;
    if (avatar) {
      uploadData = await cloudinary.uploader.upload(avatar.path, {
        folder: "task",
      });
      console.log(uploadData);
    }

    if (updateData?.oldPassword && updateData?.newPassword) {
      if (bcrypt.compare(updateData?.oldPassword, user?.password)) {
        user.password = updateData?.newPassword;
      }
    }

    user.name = updateData.name ? updateData.name : user.name;
    user.gender = updateData.gender ? updateData.gender : user.gender;
    user.age = updateData.age ? updateData.age : user.age;

    user.avatar.public_id = uploadData?.public_id ? uploadData?.public_id : "";
    user.avatar.url = uploadData?.secure_url ? uploadData?.secure_url : "";

    await user.save();

    if (avatar) {
      fs.unlinkSync(req.file.path);
    }
    return res.json({
      success: true,
      message: "Update successfull",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error while updating user",
    });
  }
};
