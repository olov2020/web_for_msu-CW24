import OneWeek from "./oneWeek/OneWeek.jsx";
import {useEffect, useState} from "react";
import {getSchedule} from "../../api/coursesApi.js";

const Schedule = () => {

  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const getScheduleData = async () => {
      const data = await getSchedule();
      setSchedule(data);
    }

    getScheduleData();
  }, []);

  return (
    <article>
      <h1>Расписание</h1>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          gap: '5rem 0',
        }}
      >
        <OneWeek header='Текущая неделя' data={schedule.lessons_in_week}/>

        <OneWeek header='Следующая неделя' data={schedule.lessons_in_two_weeks}/>
      </section>
    </article>
  );
};

export default Schedule;