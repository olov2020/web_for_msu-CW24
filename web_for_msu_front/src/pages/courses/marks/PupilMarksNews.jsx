import React from 'react';
import style from "./teacherMarks.module.css";
import marks from "../../marks/Marks.jsx";

const PupilMarksNews = () => {
  return (
    <section className={style.marksSection}>
      <section className={style.datesSection}>
        {marks.dates.length !== 0 && marks.dates.map((date) => (
          <h3 key={date}>{date}</h3>
        ))}
      </section>

      <section className={style.markTypesSection}>
        {marks.mark_type_choices.length !== 0 && marks.mark_type_choices.map((markType) => (
          <section key={markType} className={style.markType}>
            <h3>{markType}</h3>

            <section className={style.marks}>
              {marks.marks.length !== 0 && marks.marks.map((mark) => (
                <p key={markIndex}>{mark}</p>
              ))}
            </section>
          </section>
        ))}
      </section>

      <section className={style.results}>
        <h3>Предварительный итог - {marks.result}</h3>
        <h3>Итог - {marks.teacher_result}</h3>
      </section>
    </section>
  );
};

export default PupilMarksNews;