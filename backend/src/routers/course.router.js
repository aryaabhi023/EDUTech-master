import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getCourseById,
  getCourses,
  uploadCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.route("/upload-course").post(upload.single("image"), uploadCourse);
router.route("/get-courses").get(getCourses);
router.route("/get-course/:id").get(getCourseById);

export { router };
