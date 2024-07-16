import { User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateRefeshAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.genarateAccessToken();
    const refreshToken = user.generateRefeshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, email, password, username } = req.body;
    if (
      [fullname, username, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).send({ msg: "Please fill all the fields" });
    }
    let user = await User.findOne({
      $or: [{ username }, { email }],
    });
    
    if (user) {
      console.log("User already exists");
      return res.status(400).json("User already exists");
    }

    user = new User({
      fullname,
      username,
      email,
      password,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(error.message || "Some error occurred while registering");
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const otp = Math.floor(Math.random() * 1000000);

    async function main() {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, // list of receivers
        subject: "OTP Verification",
        text: "Dear Sir/Mam", // plain text body
        html: `<b>Your email verification code is: ${otp}</b>`,
      });
    }

    await main();

    res.status(200).json(otp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username || email)) {
      return res.status(400).json("Username or email is required");
    }
    if (!password) {
      return res.status(400).json("Password is required");
    }
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    const isPasswordMatched = await user.isPasswordCorrect(password);
    if (!isPasswordMatched) {
      return res.status(400).json("Invalid credentials");
    }
    const { accessToken, refreshToken } = await generateRefeshAndRefreshToken(
      user._id
    );

    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ loggedUser, accessToken, refreshToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json("User Logout successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const currentUser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json("Unauthorized request...");
    }
    const decordToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decordToken?.id);
    if (!user) {
      return res.status(401).json("Invalid Token");
    }

    const { refreshToken, accessToken } = await generateRefeshAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

export const updateAvatar = async (req, res) => {
  try {
    let avatar = req.file?.path;
    if (!avatar) {
      return res.status(400).json("No files were uploaded.");
    }
    avatar = await uploadOnCloudinary(avatar);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: avatar.url,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(user.avatar);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    res
      .status(200)
      .json({ message: "Account details updated successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json("All fields are required");
    }
    const user = await User.findById(req.user._id);
    const isPasswordCorrect = user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json("Incorrect old password");
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json("Password changed successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const emailExist = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(false);
  }
  return res.status(200).json(true);
};

export const forgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (newPassword === "") {
    return res.status(400).json("Enter new password");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  res.status(200).json("Password is changed");
};

export const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne(username).select("-password -refreshToken");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken").sort({
      score: -1,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getScore = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id);
    return res.status(200).json({ username: user.username, score: user.score });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
