import style from '../course.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import PupilMarks from "../marks/marksItem/PupilMarks.jsx";
import TeacherMarks from "../marks/marksItem/TeacherMarks.jsx";

const CourseItem = () => {

  const userStatus = useSelector(state => state.user.authStatus);
  const params = useParams();

  return (
    <article key={params.key} className={style.courseItem}>
      <h1>{params.title}</h1>

      {
        userStatus.includes('pupil') ?
          <div>
            <PupilMarks courseId={params.key}/>
          </div> :
          userStatus.includes('teacher') ?
            <div>
              <TeacherMarks courseId={params.key}/>
            </div> :
            <></>
      }

      <p>{params.description}</p>
    </article>
  );
};

export default CourseItem;