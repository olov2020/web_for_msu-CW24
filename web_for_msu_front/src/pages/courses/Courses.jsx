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
        crediting: "зачётный для всех классов",
        credit: "Зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        following: true,
      },
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        following: false,
      },
    ],
    2023: [
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        following: true,
      },
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        following: false,
      },
    ],
    2022: [
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        following: true,
      },
      {
        auditory: null,
        crediting: "зачётный для 10-11",
        credit: "Зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        teachers: [
          "Иванов Иван Иванович"
        ],
        following: false,
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