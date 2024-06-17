import { Problem } from "../models/problem.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadProblem = async (req, res) => {
  try {
    const { statement, options, correctAnswer, tags, difficulty, points } =
      req.body;

    if (
      [statement, options, correctAnswer, tags, difficulty, points].some(
        (item) => !item
      )
    ) {
      return res.status(400).json("Please fill all fields");
    }

    let image = req.file?.path;
    if (image) {
      image = await uploadOnCloudinary(image);
    }

    const problem = new Problem({
      statement,
      options,
      correctAnswer,
      image: image?.url || null,
      tags,
      difficulty,
      points,
    });
    await problem.save();
    res.status(201).json({ message: "Problem uploaded successfully", problem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params?.id);
    if (!problem) {
      return res.status(404).json("Problem not found");
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProblemsByTags = async (req, res) => {
  try {
    const { tags } = req.body;
    const problems = await Problem.find({ tags: { $in: tags } });
    if (!problems) {
      return res.status(404).json("No problems found with that tag");
    }
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProblemsByDifficulties = async (req, res) => {
  try {
    const { difficulties } = req.body;
    const problems = await Problem.find({ difficulty: { $in: difficulties } });
    if (!problems) {
      return res.status(404).json("No problems found with that difficulty");
    }
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const checkAnswerAndGetScore = async (req, res) => {
  try {
    const user = req.user;
    const { problemId,answer } = req.body;
    const problem = await Problem.findById(problemId);
    const isAnswerCorrect = await problem.isAnswerMatched(answer);
    if (isAnswerCorrect) {
      user.score += problem.points;
      await user.save({ validateBeforeSave: false });
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
