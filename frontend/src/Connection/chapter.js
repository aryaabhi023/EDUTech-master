import axios from 'axios';

const backendUrl = "http://localhost:6004";

export const uploadChapter=async(data)=>{
    try{
        const formData = new FormData();
        for (const key in data) {
            if(key==="questions")
                continue;
            formData.append(key, data[key]);
        }

        data.questions.forEach((question, index) => {
            formData.append(`questions[${index}]`, question);
        });
        const res = await axios.post(backendUrl+'/api/v1/chapter/upload-chapter',formData);
        return res;
    }catch(err){
        console.log(err);
        return null;
    }
}

export const getChapterByNames=async(data)=>{
    try{
        const res=await axios.post(backendUrl+'/api/v1/chapter/get-chapters-by-names',data);
        console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err);
        return null;
    }
}