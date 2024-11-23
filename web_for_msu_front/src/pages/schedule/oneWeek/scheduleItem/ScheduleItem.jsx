import style from'../../schedule.module.css'

// eslint-disable-next-line react/prop-types
const ScheduleItem = ({key, date, time, courseName, auditory, credit}) => {
  return (
    <section key={key} className={style.scheduleItem}>
      <p>{date}</p>
      <p>{time}</p>
      <p className={credit === true?
      style.creditTrue :
      style.creditFalse}>{courseName}</p>
      <p>{auditory}</p>
    </section>
  );
};

export default ScheduleItem;