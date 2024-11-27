import style from '../course.module.css'
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PupilMarks from "../marks/marksItem/PupilMarks.jsx";
import TeacherMarks from "../marks/marksItem/TeacherMarks.jsx";

const CourseItem = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const {state} = useLocation();

  return (
    <article key={state.key}>
      <h1>{state.courseData.name}</h1>
      <h3 style={{
        alignSelf: 'flex-end',
        marginRight: '2rem',
      }}
      >
        {state.year}
      </h3>

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

      <section style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
      }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '70%',
          gap: '1rem 0',
        }}
        >
          <h2>Описание курса</h2>
          <p>{state.courseData.description}</p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '30%',
          gap: '1rem 0',
        }}
        >
          <h2>Преподаватели</h2>

          <ol>
            {state.courseData.teachers.map((teacher, index) => (
              <li key={index}>
                <p>{teacher}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
      }}
      >
        <p>Курс попадает под категорию: <span>{state.courseData.crediting}</span></p>
        <p>Время проведения: <span>{state.courseData.lesson_time}</span></p>
        <p>Классы: <span>{state.courseData.emsh_grades}</span></p>
        <p><span>{state.courseData.direction}</span></p>
        <p>Аудитория: <span>{state.courseData.auditory ? state.courseData.auditory : 'уточняется'}</span></p>
      </section>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '90%',
      }}
      >
        <h2>Занятия и темы</h2>


      </section>
    </article>
  );
};

export default CourseItem;