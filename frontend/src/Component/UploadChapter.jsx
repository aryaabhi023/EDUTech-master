import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadChapter } from "../Connection/chapter";


export default function UploadChapter() {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
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
    uploadChapter({
      name,
      questions:tags,
      videos,
      notes,
    }).then(() => {
      navigate("/");
    });
    console.log({
      name,
      questions:tags,
      videos,
      notes,
    });
  };

  return (
    <div className="min-h-screen pt-2 flex items-center justify-center bg-gradient-to-b from-teal-400 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Chapters</h2>
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
            <label className="block text-gray-700 font-semibold mb-2">Questions</label>
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
            <label className="block text-gray-700 font-semibold mb-2">Videos</label>
            <input
              type="file"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setVideos(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Notes</label>
            <input
              type="file"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setNotes(e.target.files[0])}
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
