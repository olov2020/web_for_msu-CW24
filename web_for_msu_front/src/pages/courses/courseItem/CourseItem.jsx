import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PupilMarks from "../marks/PupilMarks.jsx";
import TeacherMarks from "../marks/TeacherMarks.jsx";
import ChangeCourse from "../changeCourse/ChangeCourse.jsx";
import ApprovePupils from "../approvePupils/ApprovePupils.jsx";
import AddPupilOnCourse from "../addPupilOnCourse/AddPupilOnCourse.jsx";
import style from '../course.module.css';
import DeletePupilOnCourse from "../deletePupilOnCourse/DeletePupilOnCourse.jsx";

const CourseItem = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const {state} = useLocation();

  return (
    <article key={state.courseData.id}>
      <h1>{state.courseData.name}</h1>
      <h3 style={{
        alignSelf: 'flex-end',
        marginRight: '2rem',
      }}
      >
        {state.year}
      </h3>

      {state.isMyCourses && userStatus.includes('pupil') &&
        <section style={{
          width: '90%',
        }}>
          <h3>Оценка за первый
            семестр: <strong>{state.courseData.mark1 ? state.courseData.mark1 : 'пока итоговая оценка не выставлена'}</strong>
          </h3>
          <h3>Оценка за второй
            семестр: <strong>{state.courseData.mark2 ? state.courseData.mark2 : 'пока итоговая оценка не выставлена'}</strong>
          </h3>
        </section>
      }

      {state.isMyCourses &&
        ((userStatus.includes('pupil') || userStatus.includes('teacher')) && (
          <>
            <h2>Ведомость оценок</h2>
            {userStatus.includes('teacher') ? (
              <TeacherMarks courseId={state.courseData.id}/>
            ) : (
              <PupilMarks courseId={state.courseData.id}/>
            )}
          </>
        ))
      }

      {state.isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <ApprovePupils courseId={state.courseData.id}/>
        </section>
      }

      {state.isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <AddPupilOnCourse courseId={state.courseData.id}/>
        </section>
      }

      {state.isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <DeletePupilOnCourse courseId={state.courseData.id}/>
        </section>
      }

      {userStatus.includes('admin') &&
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
        }}>
          <ChangeCourse courseId={state.courseData.id}/>
        </section>
      }

      <section className={style.courseItem}>
        <div className={style.mainInfo}>
          <h2 style={{
            alignSelf: 'center',
          }}>Информация о курсе</h2>

          <p><span>Цель курса:</span> {state.courseData.course_purpose}</p>
          <p><span>Задачи курса:</span> {state.courseData.course_objectives}</p>
          <p><span>Особенности курса:</span> {state.courseData.course_features}</p>
          <p><span>Формат проведения занятий:</span> {state.courseData.course_format}</p>
          <p><span>Целевая аудитория:</span> {state.courseData.target_audience}</p>
          <p><span>Количество слушателей:</span> {state.courseData.number_of_listeners}</p>
          <p><span>Отбор на курс:</span> {state.courseData.selection}</p>
          <p><span>Система оценивания:</span> {state.courseData.assessment}</p>
          <p><span>Формат проведения курса:</span> {state.courseData.platform_format}</p>
          <p><span>Дополнительная информация:</span> {state.courseData.additional_info}</p>
        </div>

        <div className={style.asideInfo}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem 0',
          }}
          >
            <h2 style={{
              alignSelf: 'center',
            }}>Преподаватели</h2>

            <div>
              {state.courseData.teachers.map((teacher, index) => (
                <p key={index}>{teacher}</p>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2rem',
            gap: '.5rem 0',
          }}
          >
            <h2 style={{
              alignSelf: 'center',
            }}>Краткая информация</h2>

            <p><span>Краткое описание курса:</span> {state.courseData.short_description}</p>
            <p><span>Курс попадает под категорию:</span> {state.courseData.crediting}</p>
            <p><span>Время проведения:</span> {state.courseData.lesson_time}</p>
            <p><span>Классы:</span> {state.courseData.emsh_grades}</p>
            <p><span>Направление:</span> {state.courseData.direction}</p>
            <p><span>Аудитория:</span> {state.courseData.auditory ? state.courseData.auditory : 'уточняется'}</p>
          </div>
        </div>
      </section>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
      }}
      >
        <h2 style={{
          alignSelf: 'center',
        }}>Занятия и темы</h2>

        <div className={style.lessons}>
          {state.courseData.lessons && state.courseData.lessons.length > 0 && state.courseData.lessons.map((lesson) => (
            <div key={lesson.lesson_number} className={style.lesson}>
              <h3><span style={{fontSize: "inherit"}}>Тема:</span> {lesson.theme}</h3>
              <p><span>План занятия:</span> {lesson.plan}</p>
              <p style={{
                alignSelf: 'flex-end',
              }}><span>Дата:</span> {lesson.date}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default CourseItem;