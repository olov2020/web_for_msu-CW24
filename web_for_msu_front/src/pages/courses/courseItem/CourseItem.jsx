import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PupilMarks from "../marks/PupilMarks.jsx";
import TeacherMarks from "../marks/TeacherMarks.jsx";
import ChangeCourse from "../changeCourse/ChangeCourse.jsx";
import ApprovePupils from "../approvePupils/ApprovePupils.jsx";
import AddPupilOnCourse from "../addPupilOnCourse/AddPupilOnCourse.jsx";
import style from '../course.module.css';
import DeletePupilOnCourse from "../deletePupilOnCourse/DeletePupilOnCourse.jsx";
import {useEffect, useState} from "react";
import {checkIfUserIsOnCourse, getCourseById} from "../../../api/coursesApi.js";

const CourseItem = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const {pathname, state} = useLocation();
  const [courseData, setCourseData] = useState({});
  const [isMyCourses, setIsMyCourses] = useState(false);
  const [year, setYear] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathnameArr = pathname.split("/");
    const courseId = pathnameArr[pathnameArr.length - 1];
    setYear(pathnameArr[pathnameArr.length - 3]);

    try {
      if (!state) {
        const getCourseByIdFunc = async () => {
          const data = await getCourseById({courseId});
          setCourseData(data);
        }

        getCourseByIdFunc();

        const accessToken = localStorage.getItem("token");
        if (accessToken) {

          const checkIfUserIsOnCourseFunc = async () => {
            const data = await checkIfUserIsOnCourse({courseId});
            setIsMyCourses(data);
          }

          checkIfUserIsOnCourseFunc();
        }
      } else {
        setCourseData(state.courseData);
        setIsMyCourses(state.isMyCourses);
      }
    } finally {
      setLoading(false);
    }

  }, [state, pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <article key={courseData.id}>
      <h1>{courseData.name}</h1>
      {year &&
        <h3 style={{
          alignSelf: 'flex-end',
          marginRight: '2rem',
        }}
        >
          {year}
        </h3>
      }

      {isMyCourses && userStatus.includes('pupil') &&
        <section style={{
          width: '90%',
        }}>
          <h3>Оценка за первый
            семестр: <b>{courseData.mark1 ? courseData.mark1 : 'пока оценка не выставлена'}</b>
          </h3>
          <h3>Оценка за второй
            семестр: <b>{courseData.mark2 ? courseData.mark2 : 'пока оценка не выставлена'}</b>
          </h3>
        </section>
      }

      {isMyCourses &&
        ((userStatus.includes('pupil') || userStatus.includes('teacher')) && (
          <>
            <h2>Ведомость оценок</h2>
            {userStatus.includes('teacher') ? (
              <TeacherMarks courseId={courseData.id}/>
            ) : (
              <PupilMarks courseId={courseData.id}/>
            )}
          </>
        ))
      }

      {isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <ApprovePupils courseId={courseData.id}/>
        </section>
      }

      {isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <AddPupilOnCourse courseId={courseData.id}/>
        </section>
      }

      {isMyCourses && userStatus.includes('teacher') &&
        <section style={{
          width: '90%',
        }}>
          <DeletePupilOnCourse courseId={courseData.id}/>
        </section>
      }

      {userStatus.includes('admin') &&
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
        }}>
          <ChangeCourse courseId={courseData.id}/>
        </section>
      }

      <section className={style.courseItem}>
        <div className={style.mainInfo}>
          <h2 style={{
            alignSelf: 'center',
          }}>Информация о курсе</h2>

          <p><span>Цель курса:</span> {courseData.course_purpose}</p>
          <p><span>Задачи курса:</span> {courseData.course_objectives}</p>
          <p><span>Особенности курса:</span> {courseData.course_features}</p>
          <p><span>Формат проведения занятий:</span> {courseData.course_format}</p>
          <p><span>Целевая аудитория:</span> {courseData.target_audience}</p>
          <p><span>Количество слушателей:</span> {courseData.number_of_listeners}</p>
          <p><span>Отбор на курс:</span> {courseData.selection}</p>
          <p><span>Система оценивания:</span> {courseData.assessment}</p>
          <p><span>Формат проведения курса:</span> {courseData.platform_format}</p>
          <p><span>Дополнительная информация:</span> {courseData.additional_info}</p>
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
              {courseData.teachers && courseData.teachers.length !== 0 && courseData.teachers.map((teacher, index) => (
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

            <p><span>Краткое описание курса:</span> {courseData.short_description}</p>
            <p><span>Курс попадает под категорию:</span> {courseData.crediting}</p>
            <p><span>Время проведения:</span> {courseData.lesson_time}</p>
            <p><span>Классы:</span> {courseData.emsh_grades}</p>
            <p><span>Направление:</span> {courseData.direction}</p>
            {courseData.auditory && state.courseData.auditory.includes('http') ?
              <p><a href={courseData.auditory}>Ссылка на онлайн пару</a></p> :
              <p><span>Аудитория:</span> {courseData.auditory ? courseData.auditory : 'уточняется'}</p>
            }
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
          {courseData.lessons && courseData.lessons.length > 0 && courseData.lessons.map((lesson) => (
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
