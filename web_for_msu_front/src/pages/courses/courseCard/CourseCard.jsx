import style from '../course.module.css'
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CourseCard = ({key, year, courseData}) => {

  return (
    <Link to={`/courses/${year}/${courseData.name}`}
          state={{key, title: courseData.title, description: courseData.description}}
          key={key}
          className={style.courseCard}
    >
      <h3>{courseData.name}</h3>

      <p><span className={courseData.credit === 'Зачётный' ? style.credit : ''}>{courseData.credit}</span></p>
      <p>{courseData.lesson_time}</p>
      <p><span>Аудитория</span>: {courseData.auditory ? courseData.auditory : 'уточняется'}</p>
      <p><span>Текущая оценка</span>: {courseData.current_mark ? courseData.auditory : 'оценок пока нет'}</p>
    </Link>
  );
};

export default CourseCard;