import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../Connection/course';
import { getChapterByNames } from '../Connection/chapter';


const COURSE_DETAILS = [
  {
    title: 'Lec 1: Things to Know in C++/Java/Python or any language',
    videoSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
    questions: ['Question 1', 'Question 2', 'Question 3']
  },
  {
    title: 'Lec 2: Build-up Logical Thinking',
    videoSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
    questions: ['Question 1']
  }
];

const sharedClasses = {
  card: 'bg-white dark:bg-zinc-800 shadow rounded-lg',
  header: 'flex justify-between items-center p-4 border-b border-red-100 dark:border-zinc-700 cursor-pointer',
  textPrimary: 'text-zinc-800 dark:text-zinc-200',
  textSecondary: 'text-zinc-500 dark:text-zinc-400',
  hidden: 'hidden',
  video: 'w-full mb-4',
  notes: 'text-blue-500 dark:text-blue-400 underline mb-4 block',
  list: 'list-disc pl-5 text-zinc-800 dark:text-zinc-200'
};

const InsideCourse = () => {
  const {courseId}=useParams();

  const [course,setCourse]=useState([]);
  const [chapter,setChapter]=useState([]);

  useEffect(()=>{
    getCourseById(courseId).then((res)=>{
      setCourse(res.data);
      getChapterByNames(res?.data?.chapterNames).then((res2)=>{
        setChapter(res2.data);
      })
    })
  },[])

  const toggleDetails = (index) => {
    const details = document.getElementById(`details-${index}`);
    details.classList.toggle(sharedClasses.hidden);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-red-600 mb-4">{course?.name}</h2>
      <div className="space-y-4">
        {chapter.map((ch, index) => (
          <div key={index} className={sharedClasses.card}>
            <div className={sharedClasses.header} onClick={() => toggleDetails(index)}>
              <span className={sharedClasses.textPrimary}>{ch.name}</span>
            </div>
            <div id={`details-${index}`} className={`${sharedClasses.hidden} p-4`}>
              <video controls className={sharedClasses.video}>
                <source src={ch.videos} type="video/mp4" />
              </video>
              <a href={ch.notes} target='_blank' className={sharedClasses.notes}>Notes</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsideCourse;