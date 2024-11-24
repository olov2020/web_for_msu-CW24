import style from '../course.module.css'
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CourseCard = ({key, courseData}) => {

  return (
    <section className={style.courseCard}>
    <Link to={`/courses/${courseData.courseYear}/${courseData.title}`}
          state={{key: key, title: courseData.title, description: courseData.description}}
          key={key}
    >
      <h2>{courseData.title}</h2>

      <p>{courseData.dayOfWeek}</p>
      <p>{courseData.time}</p>
      <p>{courseData.auditory}</p>
    </Link>
    </section>
  );
};

export default CourseCard;