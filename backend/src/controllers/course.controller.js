import { Course } from "../models/courses.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadCourse = async (req, res) => {
  try {
    const { name, description, chapterNames } = req.body;
    let image = req.file?.path;
    image = await uploadOnCloudinary(image);
    const course = new Course({
      name,
      description,
      chapterNames,
      image: image?.url,
    });
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error.message);
    return res.status(200).json(error.message);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    return res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};
