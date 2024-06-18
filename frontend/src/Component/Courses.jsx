import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../Connection/course';

export default function Courses() {
    const [courses,setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getCourses().then((res) => {
            setCourses(res.data);
        });
    }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gradient-to-b from-teal-500 to-teal-700">
        {courses.length && courses?.map((course)=>(
            <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden" onClick={()=>navigate('/course/'+course?._id)}>
            <img src={course?.image} alt="Course Image" className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">{course?.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">{course?.description}</p>
            </div>
        </div>
        ))}        
    </div>
  )
}
