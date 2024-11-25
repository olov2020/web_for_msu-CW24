import styleApp from '../../app.module.css'
import OneWeek from "./oneWeek/OneWeek.jsx";
import {useEffect, useState} from "react";
import {getSchedule} from "../../api/coursesApi.js";

const Schedule = () => {

  const [schedule, setSchedule] = useState({
    lessons_in_week: [
      {
        course_name: "Приручение python'а",
        course_type: "Зачётный",
        auditory: null,
        date: "24.11",
        lesson_time: "Пятница 18:55 - 20:15"
      },
      {
        course_name: "Приручение python'а",
        course_type: "Не зачетный",
        auditory: null,
        date: "24.11",
        lesson_time: "Пятница 18:55 - 20:15"
      },
      {
        course_name: "Приручение python'а",
        course_type: "Не зачетный",
        auditory: null,
        date: "24.11",
        lesson_time: "Пятница 18:55 - 20:15"
      },
    ],
    lessons_in_two_weeks: [
      {
        course_name: "Приручение python'Приручение python'а",
        course_type: 'Зачётный',
        auditory: null,
        date: "24.11",
        lesson_time: "Пятница 18:55 - 20:15"
      },
      {
        course_name: "Приручение python'а",
        course_type: "Зачётный",
        auditory: null,
        date: "24.11",
        lesson_time: "Пятница 18:55 - 20:15"
      },
      {
        course_name: "Приручение python'а",
        course_type: "Не зачетный",
        auditory: null,
        date: "24.11",
        lesson_time: "Пятница 18:55 - 20:15"
      },
    ]
  });

  /*useEffect(() => {
    const getScheduleData = async () => {
      const data = await getSchedule();
      setSchedule({data});
    }

    getScheduleData();
  }, []);*/

  return (
    <article>
      <h1>Расписание</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '5rem 0',
        }}
      >
      <OneWeek header='Текущая неделя' data={schedule.lessons_in_week}/>

      <OneWeek header='Следующая неделя' data={schedule.lessons_in_two_weeks}/>
      </div>
    </article>
  );
};

export default Schedule;