import {useEffect, useState} from "react";
import CourseCard from "./courseCard/CourseCard.jsx";
import {NOT_FOUND_ROUTE} from "../../routing/consts.js";
import {redirect} from "react-router-dom";
import {getAllCourses, getMyCourses} from "../../api/coursesApi.js";

const Courses = () => {

  const url = window.location.pathname;
  const [isMyCourses, setIsMyCourses] = useState(false);
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
        description: 'Lorem ipsum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Loresum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        teachers: [
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
        ],
        pupils_number: 1,
      },
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Не зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        teachers: [
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
        ],
        pupils_number: 1,
      },
    ],

    2022: [
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Не зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        teachers: [
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
        ],
        pupils_number: 1,
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
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        teachers: [
          "Иванов Иван Иванович"
        ],
        pupils_number: 1,
      },
    ],
    2023: [
      {
        auditory: null,
        crediting: "зачётный для всех классов",
        credit: "Не зачётный",
        emsh_grades: "9 - 11",
        current_mark: null,
        direction: "Третий Путь",
        id: 3,
        lesson_time: "Пятница 18:55 - 20:15",
        name: "Приручение python'а",
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        teachers: [
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
        ],
        pupils_number: 1,
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
        description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
        teachers: [
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
          "Иванов Иван Иванович",
        ],
        pupils_number: 1,
      },
    ],
  });

  useEffect(() => {

    // Convert the dictionary to an array of key-value pairs
    const keyValuePairs = Object.entries(coursesAll);

// Reverse the array of key-value pairs
    keyValuePairs.reverse();

// Convert the reversed array back to a dictionary
    const reversedDict = Object.fromEntries(keyValuePairs);

    console.log(reversedDict)
    setCoursesAll(reversedDict);
    /*function sortObjectByKey() {
      // Get an array of the object's keys
      const keys = Object.keys(coursesAll);

      // Sort the keys alphabetically (or according to your custom sorting logic)
      keys.sort().reverse();  //For numerical keys: keys.sort((a, b) => parseInt(a) - parseInt(b));
      console.log(keys)

      // Map the sorted keys back to their values, creating a new array of [key, value] pairs.
      const sortedEntries = keys.map(key => [key, coursesAll[key]]);

      // Convert the array of [key, value] pairs back into an object (optional)
      console.log(Object.fromEntries(sortedEntries));
      setCoursesAll(Object.fromEntries(sortedEntries));
    }

    sortObjectByKey();*/
  }, [])


  /*useEffect(() => {
    const getCourses = async () => {
      const data = url === '/courses/my' ?
        await getMyCourses() :
        url === '/courses/all' ?
          await getAllCourses() : undefined;
      setCoursesAll(data);
      coursesAll.sort();
      setIsMyCourses(url === '/courses/my');
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
              <CourseCard key={courseData.id} year={year} courseData={courseData} isMyCourses={isMyCourses}/>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
};

export default Courses;