import { useEffect, useState } from 'react';
import { useParams } from'react-router-dom';
import { addSolvedProblem, checkAnswerAndGetScore, getProblemById, getSolvedProblemById } from '../Connection/problem';

const InsideProblem= () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);

    useEffect(()=>{
        getProblemById(problemId).then((res)=>{
            setProblem(res.data);
        });
    })

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  let color;
  if (feedback === 'Correct!') {
    color = 'text-green-500';
  } else if (feedback === 'Incorrect. Try again!') {
    color ='text-red-500';
  } else {
    color = 'text-zinc-800';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getSolvedProblemById(problemId).then((res)=>{
        console.log(res);
        if(res){
            setFeedback('You have already solved this problem!');
        }
        else{
            addSolvedProblem(problemId).then(()=>{
                checkAnswerAndGetScore({
                    id:problemId,
                    answer: selectedAnswer,
                  }).then((res) => {
                      if (res.data) {
                          setFeedback('Correct!');
                        } else {
                          setFeedback('Incorrect. Try again!');
                        }
                  });
            })
        }
    })
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{problem?.statement}</h1>
      <form onSubmit={handleSubmit} className="w-full">
        {problem?.options.map(option => (
          <div key={option} className="mb-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="quiz"
                value={option}
                onChange={() => setSelectedAnswer(option)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-lg">{option}</span>
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {feedback && (
        <div className={"mt-4 text-lg font-medium" + color}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default InsideProblem;
