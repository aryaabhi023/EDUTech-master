import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getChapterByNames,
  getChapters,
  uploadChapter,
} from "../controllers/chapter.controller.js";

const router = Router();

router.route("/upload-chapter").post(
  upload.fields([
    {
      name: "videos",
      maxCount: 1,
    },
    {
      name: "notes",
      maxCount: 1,
    },
  ]),
  uploadChapter
);

router.route("/get-chapters").get(getChapters);

router.route("/get-chapters-by-names").post(getChapterByNames);

export { router };
