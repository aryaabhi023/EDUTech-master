import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../Connection/course";

export default function CreateCourse() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [tagInput, setTagInput] = useState("");

  const navigate= useNavigate();

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse({
      name,
      description,
      chapterNames:tags,
      image,
    }).then((res) => {
      if(res)
      navigate("/");
      else alert("Error");
    });
    console.log({
      name,
      description,
      chapterNames:tags,
      image,
    });
  };

  return (
    <div className="min-h-screen pt-2 flex items-center justify-center bg-gradient-to-b from-teal-400 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Course</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Chapters</label>
            <div className="border border-gray-300 rounded p-2">
              <ul className="flex flex-wrap">
                {tags.map((tag, index) => (
                  <li key={index} className="flex items-center bg-gray-200 p-2 rounded mr-2 mb-2">
                    {tag}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => removeTag(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                placeholder="Enter Chapter name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image</label>
            <input
              type="file"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
