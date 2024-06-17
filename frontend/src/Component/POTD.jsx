import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllproblems } from "../Connection/problem";

export default function POTD() {
  const [problems, setProblems] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllproblems().then((res) => {
      setProblems(res.data);
    });
  }, []);

  const handleClick = (id) => {
    navigate("/inside-problem/" + id);
  };

  function getDailyRandomElement(array) {
    // Get the current date
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]; // e.g., "2024-06-12"

    // Create a simple hash from the date string
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = (hash * 31 + dateString.charCodeAt(i)) % array.length;
    }

    // Use the hash as an index to pick an element
    const index = hash % array.length;
    return array[index];
  }

  let randomIdx = problems ? getDailyRandomElement(problems) : null;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">POTD</h1>
      {randomIdx && (
        <div
          className="border-b py-4 cursor-pointer"
          key={randomIdx._id}
          onClick={() => handleClick(randomIdx._id)}
        >
          <h3 className="text-lg font-semibold">
            {randomIdx.statement.substr(0, 60)}....
          </h3>
          <div className="flex justify-between items-center mt-2">
          <span className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{randomIdx.tags[randomIdx.tags.length-1]}</span>
            <div className="text-right">
              <span className="text-zinc-500">{randomIdx.difficulty}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
