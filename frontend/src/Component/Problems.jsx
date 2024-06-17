import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllproblems } from "../Connection/problem";

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getAllproblems().then((res)=>{
            setProblems(res.data);
        })
    },[])


    const handleClick=(id)=>{
        navigate("/inside-problem/"+id);
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-zinc-800 text-white p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button className="text-red-500">CLEAR ALL</button>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">DIFFICULTY</h3>
                    <ul>
                        <li><input type="checkbox" id="easy" className="mr-2" /><label htmlFor="easy">Easy</label></li>
                        <li><input type="checkbox" id="medium" className="mr-2" /><label htmlFor="medium">Medium</label></li>
                        <li><input type="checkbox" id="hard" className="mr-2" /><label htmlFor="hard">Hard</label></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">TOPICS</h3>
                    <ul>
                        <li><input type="checkbox" id="arrays" className="mr-2" /><label htmlFor="arrays">Laws of motion (673)</label></li>
                        <li><input type="checkbox" id="strings" className="mr-2" /><label htmlFor="strings">Work, Power And Energy (399)</label></li>
                    </ul>
                    <a href="#" className="text-green-500 mt-2 inline-block">View All</a>
                </div>
            </div>
            
            <div className="w-3/4 bg-white p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Problems</h2>
                </div>
                <div className="mb-6">
                    {/* <p className="text-zinc-600">0 of {problems.length} Problems Solved</p> */}
                    {/* <div className="w-full bg-zinc-200 rounded-full h-2.5 dark:bg-zinc-700">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                    </div> */}
                </div>
                {/* <div className="bg-green-50 p-4 rounded mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Problem of the Day</span>
                            <h3 className="text-xl font-semibold">Find the Speed of the moving Object......</h3>
                        </div>
                        <div className="text-right">
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Solve Problem</button>
                            <div className="text-zinc-500 mt-2">16:00:01</div>
                        </div>
                    </div>
                </div> */}
                {
                    problems.length && problems.map((problem)=>(
                        <div className="border-b py-4" key={problem._id} onClick={()=>handleClick(problem._id)}>
                            <h3 className="text-lg font-semibold">{problem.statement.substr(0,60)}....</h3>
                            <div className="flex justify-between items-center">
                                <span className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{problem.tags[problem.tags.length-1]}</span>
                                <div className="text-right">
                                    <span className="text-zinc-500">{problem.difficulty}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
