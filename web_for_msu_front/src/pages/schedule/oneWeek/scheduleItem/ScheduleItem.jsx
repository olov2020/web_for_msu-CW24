import styleCourse from '../../../courses/course.module.css'

// eslint-disable-next-line react/prop-types
const ScheduleItem = ({key, date, time, courseName, auditory = '', credit, plan}) => {
  return (
    <section key={key} className={styleCourse.courseCard}>
      <h3>{courseName}</h3>
      {credit && <p><span className={credit === 'Зачётный' ? styleCourse.credit : ''}>{credit}</span></p>}
      <p><span>{date}</span> {time}</p>

      {auditory && auditory.includes('http') ?
        <p><a href={auditory}>Ссылка на онлайн пару</a></p> :
        <p><span>Аудитория:</span> {auditory ? auditory : 'уточняется'}</p>
      }

      <p><span>Тема: </span> {plan}</p>
    </section>
  );
};

export default ScheduleItem;