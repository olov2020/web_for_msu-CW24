import {useEffect, useState} from "react";
import {getCoursesAuditoriums} from "../../api/adminApi.js";
import Form from "../../generic/form/Form.jsx";

const Auditory = () => {

  const [courses, setCourses] = useState([]);

  const [auditoriums, setAuditoriums] = useState({});
  const [inputs, setInputs] = useState([]);

  const getCoursesAuditoriumsFunc = async () => {
    const data = await getCoursesAuditoriums();
    setCourses(data);
  };

  useEffect(() => {
    getCoursesAuditoriumsFunc();
  }, []);

  useEffect(() => {
    const auditoriumsNew = courses.reduce((acc, course) => {
      acc[`auditory ${course.id}`] = course.auditory;
      return acc;
    }, {});
    setAuditoriums(auditoriumsNew);

    const inputsNew = courses.map((course) => {
      return `auditory ${course.id}`;
    });
    setInputs(inputsNew);
  }, [courses]);

  return (
    <article>
      <h1>Назначение аудиторий</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        maxWidth: '90%',
        minWidth: '90%',
        overflowX: 'auto',
        gap: '1rem 0',
      }}>
        <section style={{
          display: 'flex',
          width: 'auto',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            width: '18%',
            alignSelf: 'center',
            textAlign: 'center',
          }}>Предмет</h2>
          <h2 style={{
            width: '18%',
            alignSelf: 'center',
            textAlign: 'center',
          }}>Время проведения</h2>
          <h2 style={{
            width: '60%',
            textAlign: 'center',
          }}>
            Аудитория / zoom
          </h2>
        </section>
        <section style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 'auto',
        }}>
          <section style={{
            display: 'flex',
            flexDirection: 'column',
            width: '36%',
            gap: '.56rem 0',
          }}>
            {courses && courses.length > 0 && courses.map((course) => (
              <div key={course.id} style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                borderBottom: '1px dashed #9F1A59',
                padding: '.7rem 0',
              }}>
                <h3 style={{
                  width: '40%',
                  alignSelf: 'center',
                }}>{course.name}</h3>
                <p style={{
                  width: '40%',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>{course.lesson_time}</p>
              </div>
            ))}
          </section>

          <div style={{
            width: '60%',
          }}>
            <Form inputs={inputs} values={auditoriums} buttonText='Сохранить выбор' type='setCoursesAuditoriums'/>
          </div>
        </section>

      </section>
    </article>
  );
};

export default Auditory;