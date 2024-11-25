import {useEffect, useState} from "react";
import CourseCard from "./courseCard/CourseCard.jsx";
import {NOT_FOUND_ROUTE} from "../../routing/consts.js";
import {redirect} from "react-router-dom";
import {getAllCourses, getMyCourses} from "../../api/coursesApi.js";

const Courses = () => {

  const url = window.location.pathname;
  const [coursesAll, setCoursesAll] = useState({
    2024: [
      {
        auditory: null,
        credit: "Зачётный",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        year: 2024,
      },
      {
        auditory: null,
        credit: "Не зачетный",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        year: 2024,
      },
    ],
    2023: [
      {
        auditory: null,
        credit: "Зачётный",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        year: 2024,
      },
      {
        auditory: null,
        credit: "Не зачетный",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        year: 2023,
      },
    ],
    2022: [
      {
        auditory: null,
        credit: "Зачётный",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        year: 2024,
      },
      {
        auditory: null,
        credit: "Не зачетный",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        year: 2022,
      },
    ]
  });

  /*useEffect(() => {
    const getCourses = async () => {
      const data = url === '/courses/my' ?
        await getMyCourses() :
        url === '/courses/all' ?
          await getAllCourses() : undefined;
      setCoursesAll(data);
    }


    getCourses();
  }, [url]);*/

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
        {Object.entries(coursesAll).map(([year, courses]) => (
          <div key={year}
               style={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '1rem 0',
               }}
          >
            <h2>{year}</h2>
            {courses.map((courseData) => (
              <CourseCard key={courseData.id} year={year} courseData={courseData}/>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
};

export default Courses;