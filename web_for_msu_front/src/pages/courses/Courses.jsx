import {useEffect, useState} from "react";
import CourseCard from "./courseCard/CourseCard.jsx";
import {NOT_FOUND_ROUTE} from "../../routing/consts.js";
import {redirect} from "react-router-dom";
import {getAllCourses, getMyCourses} from "../../api/coursesApi.js";

const Courses = () => {

  const url = window.location.pathname;
  const [courses, setCourses] = useState([
    {
      id: 0,
      title: 'Initial name',
      courseYear: '2024',
      dayOfWeek: 'monday',
      time: '15:00-16:00',
      auditory: '204',
      description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    },
  ]);

  /*useEffect(() => {
    const getCourses = async () => {
      const data = url === '/courses/my' ?
        await getMyCourses() :
        url === '/courses/all' ?
          await getAllCourses() : undefined;
      setCourses(data);
    }


    getCourses();
  }, [url]);*/

  return (
    <article>
      {
        url === ('/courses/my') || url === '/'?
          <h1>Мои курсы</h1> :
          url === ('/courses/all') ?
            <h1>Все курсы</h1> :
            redirect(NOT_FOUND_ROUTE)
      }

      <div>
        {courses.map((item) => (
          <CourseCard key={item.id} courseData={item}/>
        ))}
      </div>
    </article>
  );
};

export default Courses;