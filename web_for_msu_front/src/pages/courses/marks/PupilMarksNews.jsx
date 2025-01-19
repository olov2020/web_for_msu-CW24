import React from 'react';

const PupilMarksNews = () => {
  return (
    <section className={style.marksSection}>
      <section className={style.markTypes}>
        <h3>Тип оценки / Даты</h3>
        {marks.mark_type_choices && marks.mark_type_choices.length !== 0 && mark_type_choices.dates.map((markType) => (
          <h3><span>{markType}</span></h3>
        ))}
      </section>

      <section className={style.marks}>
        {marks.dates && marks.dates.length !== 0 && marks.dates.map((date) => (
          <h3 key={date}>{date}</h3>
        {marks.marks && marks.marks.length !== 0 && marks.marks.map((markArray) => (
          markArray && markArray.length !== 0 && markArray.map((mark) => (
          <p key={mark}>{markArray}</p>
      ))
      ))}
      ))}
    </section>
</section>
)
  ;
};

export default PupilMarksNews;