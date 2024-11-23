import style from '../courseItem/course.module.css'
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CourseCard = ({key, courseData}) => {

  return (
    <Link to={`/courses/${courseData.courseYear}/${courseData.title}`} state={{ key: key, title: courseData.title, description: courseData.description }}>
      <section key={key} className={style.courseCard}>
        <h3>{courseData.title}</h3>

        <p>{courseData.dayOfWeek}</p>
        <p>{courseData.time}</p>
        <p>{courseData.auditory}</p>
      </section>
    </Link>
  );
};

export default CourseCard;