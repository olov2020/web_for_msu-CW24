import {useEffect, useState} from "react";
import CourseCard from "./courseCard/CourseCard.jsx";
import {NOT_FOUND_ROUTE} from "../../routing/consts.js";
import {redirect, useLocation} from "react-router-dom";
import {getAllCourses, getMyCoursesPupil, getMyCoursesTeacher} from "../../api/coursesApi.js";
import {useSelector} from "react-redux";

const Courses = () => {

  const url = window.location.pathname;
  const location = useLocation();
  const authStatus = useSelector(state => state.user.authStatus);
  const [isMyCourses, setIsMyCourses] = useState(true);
  const [coursesAll, setCoursesAll] = useState({});

  useEffect(() => {
    const getCourses = async () => {
      const data = url === '/courses/my' ?
        authStatus.include('pupil') ?
          await getMyCoursesPupil() :
          await getMyCoursesTeacher() :
        url === '/courses/all' ?
          await getAllCourses() : undefined;

      setCoursesAll(data);
      setIsMyCourses(url === '/courses/my');
    }

    getCourses();
  }, [location]);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2020; year--) {
    years.push(year);
  }

  return (
    <article>
      {
        url === ('/courses/my') || url === '/' ?
          <h1>Мои курсы</h1> :
          url === ('/courses/all') ?
            <h1>Все курсы</h1> :
            redirect(NOT_FOUND_ROUTE)
      }

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem 0',
        width: '90%',
      }}>
        {coursesAll ? years.map((year) => (
            coursesAll[year] &&
            <div key={year}
                 style={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '1rem 0',
                 }}
            >
              <h2>{year}-{year + 1}</h2>
              {coursesAll[year].map((courseData) => (
                <CourseCard key={courseData.id} year={year} courseData={courseData} isMyCourses={isMyCourses}/>
              ))}
            </div>
          )) :
          url === ('/courses/my') ?
            <h3>Вы не записаны ни на один курс</h3> :
            <h3>Нет доступных курсов</h3>
        }
      </div>
    </article>
  )
    ;
};

export default Courses;