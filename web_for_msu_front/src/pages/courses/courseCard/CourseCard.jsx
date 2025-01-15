import style from '../course.module.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
const CourseCard = ({key, year, courseData, isMyCourses}) => {

  const userStatus = useSelector(state => state.user.authStatus)

  return (
    <Link to={`/courses/${year}/${courseData.name}`}
          state={{year, courseData, isMyCourses}}
          key={key}
          className={style.courseCard}
    >
      {!isMyCourses &&
        <>
          <h3>{courseData.name}</h3>

          <p><span>{courseData.crediting}</span></p>
          <p>{courseData.lesson_time}</p>
          <p><span>Классы:</span> {courseData.emsh_grades}</p>
          <p><span>{courseData.direction}</span></p>
        </>
      }
      {isMyCourses && userStatus.includes('pupil') &&
        <>
          <h3>{courseData.name}</h3>

          <p><span className={courseData.credit === 'Зачётный' ? style.credit : ''}>{courseData.credit}</span></p>
          <p>{courseData.lesson_time}</p>
          <p><span>Аудитория:</span> {courseData.auditory ? courseData.auditory : 'уточняется'}</p>
          <p><span>Текущая оценка:</span> {courseData.current_mark ? courseData.current_mark : 'оценок пока нет'}</p>
        </>
      }
      {isMyCourses && userStatus.includes('teacher') &&
        <>
          <h3>{courseData.name}</h3>

          <p><span>Классы:</span> {courseData.emsh_grades}</p>
          <p>{courseData.lesson_time}</p>
          <p><span>Аудитория:</span> {courseData.auditory ? courseData.auditory : 'уточняется'}</p>
          <p><span>Количество учеников:</span> {courseData.pupils_number}</p>
        </>
      }
    </Link>
  );
};

export default CourseCard;