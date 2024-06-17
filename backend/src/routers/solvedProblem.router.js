import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addSolvedProblem, getSolvedProblemById } from "../controllers/solvedProblem.controller.js";

const router = Router();

router.route("/solved-problem").post(verifyJwt, addSolvedProblem);
router.route("/get-solved-problem").post(verifyJwt, getSolvedProblemById);

export { router };
