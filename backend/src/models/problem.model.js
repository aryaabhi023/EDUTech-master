import mongoose from "mongoose";
import bcrypt from "bcrypt";

const problemSchema = new mongoose.Schema(
  {
    statement: {
      type: "String",
      required: true,
    },
    options: {
      type: [String],
      required: true,
      min: 2,
      max: 6,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    points: {
      type: Number,
      requried: true,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

problemSchema.pre("save", async function (next) {
  this.correctAnswer = await bcrypt.hash(this.correctAnswer, 10);
  next();
});

problemSchema.methods.isAnswerMatched = async function (Answer) {
  return await bcrypt.compare(Answer, this.correctAnswer);
};

export const Problem = mongoose.model("Problem", problemSchema);
