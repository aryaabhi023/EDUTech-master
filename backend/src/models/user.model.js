import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "please write your full name"],
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+$/, "Please use a valid email address"],
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    avatar: {
      type: String,
      default:"http://res.cloudinary.com/abhishub/image/upload/v1717574461/default-avatar_c3g81w_r9doen.jpg",
    },
    score: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefeshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return refreshToken;
};
userSchema.methods.genarateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      id: this._id,
      fullname: this.fullname,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return accessToken;
};

export const User = mongoose.model("User", userSchema);
