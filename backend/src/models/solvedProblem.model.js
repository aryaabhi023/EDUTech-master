import mongoose, { Schema } from "mongoose";

const solvedProblemSchema = new mongoose.Schema(
  {
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const SolvedProblem = mongoose.model(
  "SolvedProblem",
  solvedProblemSchema
);
