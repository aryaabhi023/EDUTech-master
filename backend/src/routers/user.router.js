import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  currentUser,
  login,
  logout,
  refreshAccessToken,
  register,
  sendOtp,
  updateAvatar,
  updateAccount,
  changePassword,
  emailExist,
  forgetPassword,
  getUserProfile,
  allUser,
  getScore,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt, logout);
router.route("/verify-email").post(sendOtp);
router.route("/current-user").get(verifyJwt, currentUser);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/update-avatar")
  .patch(verifyJwt, upload.single("avatar"), updateAvatar);
router.route("/update-account").patch(verifyJwt, updateAccount);
router.route("/change-password").patch(verifyJwt, changePassword);
router.route("/email-exists").post(emailExist);
router.route("/forget-password").patch(forgetPassword);
router.route("/c/:username").post(verifyJwt, getUserProfile);
router.route("/all-users").get(allUser);
router.route("/get-score").get(verifyJwt, getScore);

export { router };
