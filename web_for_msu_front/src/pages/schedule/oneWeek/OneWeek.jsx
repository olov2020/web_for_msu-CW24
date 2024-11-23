import ScheduleItem from "./scheduleItem/ScheduleItem.jsx";

// eslint-disable-next-line react/prop-types
const OneWeek = ({header, data}) => {

  return (
    <section>
      <h2>{header}</h2>

      <div>
        {/* eslint-disable-next-line react/prop-types */}
        {data.map((item, index) => (
          <ScheduleItem
            key={index}
            date={item.date}
            time={item.time}
            courseName={item.courseName}
            auditory={item.auditory}
            credit={item.credit}
          />
        ))}
      </div>
    </section>
  );
};

export default OneWeek;