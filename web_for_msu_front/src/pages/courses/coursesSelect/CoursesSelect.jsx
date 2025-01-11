import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCoursesSelect, getCoursesSelectStatus} from "../../../api/coursesApi.js";
import Form from "../../../generic/form/Form.jsx";

const CoursesSelect = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const [selectCoursesStatus, setSelectCoursesStatus] = useState(false);
  const [courses, setCourses] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [values, setValues] = useState({});

  useEffect(() => {
    const getCoursesSelectStatusFunc = async () => {
      const responseStatus = await getCoursesSelectStatus();
      setSelectCoursesStatus(responseStatus);
    }

    getCoursesSelectStatusFunc();

    const getCoursesSelectFunc = async () => {
      const data = await getCoursesSelect();
      setCourses(data);
    }

    getCoursesSelectFunc();
  }, []);

  useEffect(() => {
    const inputsNew = courses.map((course) => {
      return `course ${course.id}`
    })
    setInputs(inputsNew);

    const valuesNew = courses.reduce((acc, course) => {
      acc[`course ${course.id}`] = course.selected;
      return acc;
    }, {})
    setValues(valuesNew);
  }, [courses]);

  if (!selectCoursesStatus) {
    return (
      <article>
        <h1>В данный момент выбор курсов не доступен</h1>
      </article>
    )
  }

  return (
    <article>
      <h1>Выбор курсов</h1>

      {userStatus === 'pupil' ?
        <section style={{
          display: "flex",
          width: '90%',
        }}>
          <section style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            gap: '.56rem 0',
          }}>
            {courses.map((course) => (
              <div key={course.id} style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                borderBottom: '1px dashed #9F1A59',
                padding: '.7rem 0',
              }}>
                <h3>{course.name}</h3>
                <p><span>{course.lesson_time}</span></p>
                <p>{course.direction}: {course.emsh_grades} - <span>{course.crediting}</span></p>
              </div>
            ))}
          </section>

          <section style={{
            width: '30%',
          }}>
            <Form inputs={inputs} values={values} buttonText='Сохранить выбор' type='selectCourses'/>
          </section>
        </section> :
        <section>
          <h3>Вам не доступен выбор курсов</h3>
        </section>
      }
    </article>
  );
};

export default CoursesSelect;