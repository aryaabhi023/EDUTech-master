import mongoose, { Schema } from "mongoose";

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "name field already exists"],
  },
  videos: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  questions: {
    type: [String],
  },
});

export const Chapter = mongoose.model("Chapter", chapterSchema);
