import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCoursesSelect, getCoursesSelectStatus} from "../../../api/coursesApi.js";
import Form from "../../../generic/form/Form.jsx";
import style from './coursesSelect.module.css';
import {useLocation} from "react-router-dom";

const CoursesSelect = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const [selectCoursesStatus, setSelectCoursesStatus] = useState(false);
  const [courses, setCourses] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [values, setValues] = useState({});
  const {pathname} = useLocation();

  useEffect(() => {
    const getCoursesSelectStatusFunc = async () => {
      const responseStatus = await getCoursesSelectStatus();
      setSelectCoursesStatus(responseStatus);
    }

    getCoursesSelectStatusFunc();

    const getCoursesSelectFunc = async () => {
      const data = await getCoursesSelect();
      setCourses(data);
    }

    getCoursesSelectFunc();
  }, [userStatus, pathname]);

  useEffect(() => {
    const inputsNew = courses.map((course) => {
      return `course ${course.id}`
    })
    setInputs(inputsNew);

    const valuesNew = courses.reduce((acc, course) => {
      acc[`course ${course.id}`] = course.selected;
      return acc;
    }, {})
    setValues(valuesNew);
  }, [courses, pathname]);

  if (!selectCoursesStatus) {
    return (
      <article>
        <h1>В данный момент выбор курсов не доступен</h1>
      </article>
    )
  }

  return (
    <article>
      <h1>Выбор курсов</h1>

      {userStatus.includes('pupil') && !userStatus.includes('retired') ?
        <section className={style.section}>
          <section className={style.name}>
            <h2>Название</h2>
            {courses.map((course) => (
              <h3 key={course.id}>{course.name}</h3>
            ))}
          </section>

          <section className={style.time}>
            <h2>Время</h2>
            {courses.map((course) => (
              <h3 key={course.id}>{course.lesson_time}</h3>
            ))}
          </section>

          <section className={style.info}>
            <h2>Общая информация</h2>
            {courses.map((course) => (
              <h3 key={course.id}>{course.direction}: {course.emsh_grades} - <span>{course.crediting}</span></h3>
            ))}
          </section>

          <section className={style.choice}>
            <h2>Выбор курса</h2>
            <Form inputs={inputs} values={values} buttonText='Сохранить выбор' type='selectCourses'/>
          </section>
        </section> :
        <section>
          <h3>Вам не доступен выбор курсов</h3>
        </section>
      }
    </article>
  );
};

export default CoursesSelect;