import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCoursesSelect, getCoursesSelectStatus} from "../../../api/coursesApi.js";
import styleCourse from "../course.module.css";
import ToggleSwitch from "../../../generic/form/toggleSwitch/ToggleSwitch.jsx";


const CoursesSelect = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const [selectCoursesStatus, setSelectCoursesStatus] = useState(true);
  const [courses, setCourses] = useState([
    {
      name: 'Приручение python\'а',
      id: 1,
      lesson_time: "Вторник 17:20 - 18:40",
      crediting: "зачётный для всех классов",
      direction: "Третий Путь",
      emsh_grades: "9 - 11",
      selected: false,
    },
    {
      name: 'Приручение python\'а',
      id: 1,
      lesson_time: "Вторник 17:20 - 18:40",
      crediting: "зачётный для всех классов",
      direction: "Третий Путь",
      emsh_grades: "9 - 11",
      selected: false,
    },
  ]);

  useEffect(() => {
    const getCoursesSelectStatusFunc = async () => {
      const responseStatus = await getCoursesSelectStatus();
      setSelectCoursesStatus(responseStatus);
    }

    getCoursesSelectStatusFunc();
  }, []);

  /*useEffect(() => {
    const getAllCoursesFunc = async () => {
      try {
        const data = await getCoursesSelect();
        setCourses(data);
      } catch (error) {
        setCourses(null);
      }
    }

    getAllCoursesFunc();
  }, []);*/

  if (!selectCoursesStatus) {
    return (
      <article>
        {userStatus.includes('pupil') ?
          <>
            <h1>Выбор курсов</h1>
            <h3>В данный момент выбор курсов не доступен</h3>
          </> :
          <>
            <h1>Списки заявок на курсы</h1>
            <h3>В данный момент заявок на курсы нет</h3>
          </>
        }
      </article>
    )
  }

  return (
    <article>
      {userStatus.includes('pupil') ?
        <h1>Выбор курсов</h1> :
        <h1>Списки заявок на курсы</h1>
      }

      {userStatus.includes('pupil') ?
        <section style={{
          display: "flex",
          flexDirection: "column",
          width: '90%',
          gap: '1rem 0',
        }}>
          {courses.map((course) => (
            <div key={course.id} className={styleCourse.courseCard}>
              <h3>{course.name}</h3>
              <p><span>{course.lesson_time}</span></p>
              <p>{course.direction}: {course.emsh_grades} - <span>{course.crediting}</span></p>

              <ToggleSwitch/>
            </div>
          ))}
        </section> :
        <section>

        </section>
      }
    </article>
  );
};

export default CoursesSelect;