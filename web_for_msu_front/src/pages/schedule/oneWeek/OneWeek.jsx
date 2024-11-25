import ScheduleItem from "./scheduleItem/ScheduleItem.jsx";
import style from '../schedule.module.css'

// eslint-disable-next-line react/prop-types
const OneWeek = ({header, data}) => {

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      gap: '1rem 0',
    }}
    >
      <h2
        style={{
          alignSelf: "flex-start",
        }}
      >{header}</h2>

      <div className={style.course}>
        {/* eslint-disable-next-line react/prop-types */}
        {data.map((item, index) => (
          <ScheduleItem
            key={index}
            date={item.date}
            time={item.lesson_time}
            courseName={item.course_name}
            auditory={item.auditory}
            credit={item.course_type}
          />
        ))}
      </div>
    </section>
  );
};

export default OneWeek;