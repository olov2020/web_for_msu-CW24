import styleApp from '../../app.module.css'
import OneWeek from "./oneWeek/OneWeek.jsx";
import {useEffect, useState} from "react";
import {getSchedule} from "../../api/coursesApi.js";

const Schedule = () => {

  const [schedule, setSchedule] = useState({
    lessons_in_week: [
      {courseName: 'asd', date: 'asd', time: 'asd', auditory: 'asd', credit: true},
      {courseName: '123', date: '4523', time: '123', auditory: 'a12313sd', credit: false},
      {courseName: 'asd', date: 'asd', time: 'asd', auditory: 'asd', credit: true},
      ],
    lessons_in_two_weeks: [
      {courseName: '123', date: '4523', time: '123', auditory: 'a12313sd', credit: false},
      {courseName: 'asd', date: 'asd', time: 'asd', auditory: 'asd', credit: true},
      {courseName: '123', date: '4523', time: '123', auditory: 'a12313sd', credit: false},
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
    <article className={styleApp.pageTitle}>
      <h1 className={styleApp.pageTitle}>Расписание</h1>

      <div>
        <OneWeek header='Текущая неделя' data={schedule.lessons_in_week}/>
      </div>

      <div>
        <OneWeek header='Следующая неделя' data={schedule.lessons_in_two_weeks}/>
      </div>
    </article>
  );
};

export default Schedule;