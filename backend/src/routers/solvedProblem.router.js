import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addSolvedProblem } from "../controllers/solvedProblem.controller.js";

const router = Router();

router.route("/solved-problem").post(verifyJwt, addSolvedProblem);

export { router };
