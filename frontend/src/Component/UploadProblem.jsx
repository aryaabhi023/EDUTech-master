import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProblem } from "../Connection/problem";

export default function UploadProblem() {
  const [statement, setStatement] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [points, setPoints] = useState("");
  const [image, setImage] = useState(null);
  const [tagInput, setTagInput] = useState("");

  const navigate= useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    if(value === "") {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
    else {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    }
  };

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
    uploadProblem({
      statement,
      options,
      correctAnswer,
      tags,
      difficulty,
      points,
      image,
    }).then(() => {
      navigate("/");
    });
    console.log({
      statement,
      options,
      correctAnswer,
      tags,
      difficulty,
      points,
      image,
    });
  };

  return (
    <div className="min-h-screen pt-2 flex items-center justify-center bg-gradient-to-b from-teal-400 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Statement</label>
            <textarea
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                className="w-full mt-1 p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={addOption}>
              Add Option
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Correct Answer</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tags</label>
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
                placeholder="Enter tag name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Difficulty</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Points</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image (optional)</label>
            <input
              type="file"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
