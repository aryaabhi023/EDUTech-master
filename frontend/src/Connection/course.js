import axios from "axios";

const backendUrl = "http://localhost:6004";

export const getCourses=async()=>{
    try{
        const res=await axios.get(backendUrl+"/api/v1/course/get-courses");
        return res;
    }catch(error){
        console.log(error.message);
        return null;
    }
}

export const createCourse = async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            if(key==="chapterNames")
                continue;
            formData.append(key, data[key]);
        }

        data.chapterNames.forEach((chapterName, index) => {
            formData.append(`chapterNames[${index}]`, chapterName);
        });

        const res = await axios.post(`${backendUrl}/api/v1/course/upload-course`, formData);
        return res;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

export const getCourseById=async(id)=>{
    try {
      const res=await axios.get(backendUrl+"/api/v1/course/get-course/"+id);
      return res;
    } catch (error) {
      console.log(error.message);
      return null;
    }
}
