import {useEffect, useState} from "react";
import {getCoursesAuditoriums} from "../../api/adminApi.js";
import Form from "../../generic/form/Form.jsx";
import style from './auditory.module.css'
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const Auditory = () => {

  const [courses, setCourses] = useState([]);

  const [auditoriums, setAuditoriums] = useState({});
  const [inputs, setInputs] = useState([]);
  const {pathname} = useLocation();
  const authStatus = useSelector(state => state.user.authStatus);

  useEffect(() => {
    const getCoursesAuditoriumsFunc = async () => {
      const data = await getCoursesAuditoriums();
      setCourses(data);
    };

    getCoursesAuditoriumsFunc();
  }, [pathname, authStatus]);

  useEffect(() => {
    const auditoriumsNew = courses.reduce((acc, course) => {
      acc[`auditory ${course.id}`] = course.auditory;
      return acc;
    }, {});
    setAuditoriums(auditoriumsNew);

    const inputsNew = courses.map((course) => {
      return `auditory ${course.id}`;
    });
    setInputs(inputsNew);
  }, [courses]);

  return (
    <article>
      <h1>Назначение аудиторий</h1>

      <section className={style.section}>
        <section className={style.subject}>
          <h2>Предмет</h2>
          {courses && courses.length !== 0 && courses.map(course => (
            <h3 key={course.id}>{course.name}</h3>
          ))}
        </section>

        <section className={style.time}>
          <h2>Время проведения</h2>
          {courses && courses.length !== 0 && courses.map(course => (
            <h3 key={course.id}>{course.lesson_time}</h3>
          ))}
        </section>

        <section className={style.auditory}>
          <h2>Аудитория / zoom</h2>
          <Form inputs={inputs} values={auditoriums} buttonText='Сохранить выбор' type='setCoursesAuditoriums'/>
        </section>
      </section>
    </article>
  );
};

export default Auditory;