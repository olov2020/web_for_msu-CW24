import style from '../course.module.css'
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PupilMarks from "../marks/marksItem/PupilMarks.jsx";
import TeacherMarks from "../marks/marksItem/TeacherMarks.jsx";

const CourseItem = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const {state} = useLocation();

  return (
    <article key={state.key} className={style.courseItem}>
      <h1>{state.title}</h1>

      {
        userStatus.includes('pupil') ?
          <div>
            <PupilMarks courseId={state.key}/>
          </div> :
          userStatus.includes('teacher') ?
            <div>
              <TeacherMarks courseId={state.key}/>
            </div> :
            <></>
      }

      <p>{state.description}</p>
    </article>
  );
};

export default CourseItem;