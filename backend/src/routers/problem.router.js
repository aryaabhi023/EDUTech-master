import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  uploadProblem,
  getProblem,
  getProblems,
  getProblemsByTags,
  getProblemsByDifficulties,
  checkAnswerAndGetScore,
} from "../controllers/problem.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/upload-problem").post(upload.single("image"), uploadProblem);
router.route("/get-problem/:id").get(getProblem);
router.route("/get-problems").get(getProblems);
router.route("/get-problems-by-tags").post(getProblemsByTags);
router.route("/get-problems-by-difficulties").post(getProblemsByDifficulties);
router.route("/check-answer").post(verifyJwt, checkAnswerAndGetScore);

export { router };
