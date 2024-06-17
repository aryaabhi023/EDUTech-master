import { Chapter } from "../models/chapter.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChapterByNames = async (req, res) => {
  try {
    const chapterNames = req.body;
    const chapters = await Chapter.find({ name: { $in: chapterNames } });
    if (!chapters) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadChapter = async (req, res) => {
  try {
    const { name, questions } = req.body;

    if ([name, questions].some((item) => !item)) {
      return res.status(400).json("All fields are necessary");
    }

    let video = req.files?.videos?.[0]?.path;
    let note = req.files?.notes?.[0]?.path;

    if (video) {
      video = await uploadOnCloudinary(video);
    }

    if (note) {
      note = await uploadOnCloudinary(note);
    }

    const chapter = new Chapter({
      name,
      notes: note?.url,
      questions,
      videos: video?.url,
    });

    await chapter.save();
    return res
      .status(201)
      .json({ message: "Chapter uploaded successfully", chapter });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error.message);
  }
};
