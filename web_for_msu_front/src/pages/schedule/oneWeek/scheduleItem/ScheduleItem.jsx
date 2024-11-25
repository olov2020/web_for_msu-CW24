import styleCourse from '../../../courses/course.module.css'

// eslint-disable-next-line react/prop-types
const ScheduleItem = ({key, date, time, courseName, auditory, credit}) => {
  return (
    <section key={key} className={styleCourse.courseCard}>
      <h3>{courseName}</h3>
      <p><span className={credit === 'Зачётный' ? styleCourse.credit : ''}>{credit}</span></p>
      <p><span>Время проведения: </span>{time}</p>
      <p><span>Дата проведения: </span>{date}</p>

      <p><span>Аудитория: </span>{auditory ? auditory : 'уточняется'}</p>
    </section>
  );
};

export default ScheduleItem;