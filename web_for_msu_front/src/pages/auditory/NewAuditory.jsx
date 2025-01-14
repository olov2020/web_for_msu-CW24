import React from 'react';
import Form from "../../generic/form/Form.jsx";
import style from "./auditory.module.css";

const NewAuditory = () => {
  return (
    <section className={style.section}>
      <section className={style.subject}>
        <h2>Предмет</h2>
        {courses.map(course => (
          <h3 key={course.id}>{course.name}</h3>
        ))}
      </section>

      <section className={style.time}>
        <h2>Время проведения</h2>
        {courses.map(course => (
          <h3 key={course.id}>{course.lesson_time}</h3>
        ))}
      </section>

      <section>
        <h2>Аудитория / zoom</h2>
        <Form inputs={inputs} values={auditoriums} buttonText='Сохранить выбор' type='setCoursesAuditoriums'/>
      </section>
    </section>
  );
};

export default NewAuditory;