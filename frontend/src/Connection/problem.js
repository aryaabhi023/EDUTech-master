import axios from "axios";
const backendUrl = "http://localhost:6004";


export const uploadProblem=async(data)=>{
    try{
        const res=await axios.post(backendUrl+"/api/v1/problem/upload-problem",data);
        return res;
    }catch(error){
        console.log(error.message);
        return null;
    }
}

export const getAllproblems=async()=>{
    try{
        const res=await axios.get(backendUrl+"/api/v1/problem/get-problems");
        return res;
    }catch(error){
        console.log(error.message);
        return null;
    }
}

export const getProblemById=async(id)=>{
    try{
        const res=await axios.get(backendUrl+"/api/v1/problem/get-problem/"+id);
        return res;
    }catch(error){
        console.log(error.message);
        return null;
    }
}

export const checkAnswerAndGetScore=async(data)=>{
    try {
        const {id,answer}=data;
        const res=await axios.post(backendUrl+"/api/v1/problem/check-answer",{problemId:id,answer});
        return res;
    } catch (error) {
        console.log(res);
        return res;
    }
}