import {useEffect, useState, useId} from "react";
import { getCourses } from "../Connection/course";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses().then((res) => {
      setCourses(res.data);
    });
  }, []);


  const navigate = useNavigate();
  const id=useId();

  return (
    <div>
      <div className="bg-gradient-to-b from-teal-500 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Hello, What Do You Want To Learn?
          </h1>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Enter the course you are searching..."
              className="w-2/3 md:w-1/3 p-3 rounded-l-lg text-zinc-900"
            />
            <button className="bg-green-500 p-3 rounded-r-lg text-white">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6" key={id}>
        {courses.length && courses.map((course)=>(
          <div className="bg-zinc-200 dark:bg-zinc-700 m-2 shadow-lg rounded-lg p-6" key={course?._id} onClick={()=>navigate('/course/'+course?._id)}>
          <div className="flex items-center" key={course?.id+'1'}>
            <img
              key={course?.id+'2'}
              src={course?.image}
              alt="Read"
              className="h-12 w-12"
            />
            <h2 key={course?.id+'3'} className="ml-4 text-xl font-bold text-zinc-900 dark:text-white">
              {course?.name}
            </h2>
          </div>
          <p key={course?.id+'4'} className="mt-2 text-zinc-600 dark:text-zinc-400">
          {course?.description}
          </p>
        </div>
        ))}
      </div>
    </div>
  );
}
