import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authentication")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json("Unauthorized request...");
    }

    const decordToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decordToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json("Invalid Access Token...");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
