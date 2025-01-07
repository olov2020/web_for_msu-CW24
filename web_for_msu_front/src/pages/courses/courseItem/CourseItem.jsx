import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PupilMarks from "../marks/PupilMarks.jsx";
import TeacherMarks from "../marks/TeacherMarks.jsx";
import ChangeCourse from "../changeCourse/ChangeCourse.jsx";
import ApprovePupils from "../approvePupils/ApprovePupils.jsx";

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

      {state.isMyCourses &&
        ((userStatus.includes('pupil') || userStatus.includes('teacher')) && (
          <>
            <h2>Ведомость оценок</h2>
            {userStatus.includes('pupil') ? (
              <PupilMarks courseId={state.key}/>
            ) : userStatus.includes('teacher') ? (
              <TeacherMarks courseId={state.key}/>
            ) : (
              <></>
            )}
          </>
        ))
      }

      {userStatus.includes('admin') &&
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
        }}>
          <ChangeCourse/>
        </section>
      }

      {state.isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <ApprovePupils courseId={state.courseId}/>
        </section>
      }

      <section style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        gap: '0 2rem',
      }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '80%',
          gap: '1rem 0',
        }}
        >
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

        <div style={{
          width: '20%'
        }}>
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
                <>
                  <p key={index}>{teacher}</p>
                  <p key={index}>{teacher}</p>
                  <p key={index}>{teacher}</p>
                </>
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '2rem',
        }}>
          {state.courseData.lessons && state.courseData.lessons.length > 0 && state.courseData.lessons.map((lesson) => (
            <div key={lesson.lesson_number} style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              gap: '1rem 0',
              border: '1px dotted #9F1A59',
              borderRadius: '1rem',
              height: 'auto',
            }}>
              <h3><span style={{fontSize: "inherit"}}>Тема:</span> {lesson.theme}</h3>
              <p><span>План занятия:</span> {lesson.plan}</p>
              {/*<p>
                <span>Дополнительная информация:</span> {lesson.additional_info ? lesson.additional_info : 'отсутствует'}
              </p>*/}
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