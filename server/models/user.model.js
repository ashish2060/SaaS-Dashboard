import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be atleast 6 characters"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    AccessToken: String,
    RefreshToken: String,
  },
  { timestamps: true }
);

// hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// accesstoken
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "");
};

// refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "");
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
