import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router as userRouter } from "./routers/user.router.js";
import { router as problemRouter } from "./routers/problem.router.js";
import { router as solvedProblemRouter } from "./routers/solvedProblem.router.js";
import { router as chapterRouter } from "./routers/chapter.router.js";
import { router as courseRouter } from "./routers/course.router.js";

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

//Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/problem", problemRouter);
app.use("/api/v1/problem_solved", solvedProblemRouter);
app.use("/api/v1/chapter", chapterRouter);
app.use("/api/v1/course", courseRouter);

export default app;
