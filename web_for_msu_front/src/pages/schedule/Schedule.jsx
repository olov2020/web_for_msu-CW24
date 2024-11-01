import styleApp from '../../app.module.css'
import OneWeek from "./oneWeek/OneWeek.jsx";

const Schedule = () => {

  const current = new Date();
  const first = current.getDate() - current.getDay() + 1; // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const fromDateCurrentWeek = new Date(current);
  const toDateCurrentWeek = new Date(current.setDate(last));

  const fromDateNextWeek = new Date(current.setDate(last + 1));
  const toDateNextWeek = new Date(current.setDate(last + 7));

  return (
    <div className={styleApp.pageTitle}>
      <h1 className={styleApp.pageTitle}>Расписание</h1>

      <div>
        <OneWeek header='Текущая неделя'
                 fromDate={`${fromDateCurrentWeek.getDate()}.${fromDateCurrentWeek.getMonth() + 1}`}
                 toDate={`${toDateCurrentWeek.getDate()}.${toDateCurrentWeek.getMonth() + 1}`}/>
      </div>

      <div>
        <OneWeek header='Следующая неделя'
                 fromDate={`${fromDateNextWeek.getDate()}.${fromDateNextWeek.getMonth() + 1}`}
                 toDate={`${toDateNextWeek.getDate()}.${toDateNextWeek.getMonth() + 1}`}/>
      </div>
    </div>
  );
};

export default Schedule;