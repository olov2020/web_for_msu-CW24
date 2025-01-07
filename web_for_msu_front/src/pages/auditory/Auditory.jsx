import {useEffect, useState} from "react";
import InputText from "../../generic/form/inputs/userInputs/InputText.jsx";
import {getCoursesAuditoriums} from "../../api/adminApi.js";
import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";

const Auditory = () => {

  const [courses, setCourses] = useState([
    {id: 0, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: ''},
    {id: 1, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: 4},
    {id: 2, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: 123},
    {id: 3, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: 'lkajslawhfwioeunf2wieiufh2938rhreonjco2'},
  ]);

  const [auditoriums, setAuditoriums] = useState({});

  const getCoursesAuditoriumsFunc = async () => {
    const data = await getCoursesAuditoriums();
    setCourses(data);
  };

  useEffect(() => {
    getCoursesAuditoriumsFunc();
  }, []);

  useEffect(() => {
    const auditoriumsNew = courses.reduce((acc, course) => {
      acc[course.id] = [`auditory ${course.id}`, course.auditory];
      return acc;
    }, {});
    setAuditoriums(auditoriumsNew);
    console.log(auditoriumsNew);
  }, [courses]);


  const onSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <article>
      <h1>Назначение аудиторий</h1>

      <form onSubmit={onSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        gap: '1rem 0',
      }}>
        <div style={{
          display: 'flex',
          width: '100%',
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
        </div>
        {courses && courses.length > 0 && courses.map((course) => (
          <div key={course.id} style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}>
            <h3 style={{
              width: '18%',
              alignSelf: 'center',
            }}>{course.name}</h3>
            <p style={{
              width: '18%',
              alignSelf: 'center',
              textAlign: 'center',
            }}>{course.lesson_time}</p>
            <div style={{
              width: '60%',
            }}>
              {auditoriums[course.id] && auditoriums[course.id].length >= 2 &&
                <InputText
                  name={auditoriums[course.id][0]}
                  value={auditoriums[course.id][1]}
                  placeholder=''
                />
              }
            </div>
          </div>
        ))}

        <ButtonSubmit text='Сохранить выбор'/>
      </form>
    </article>
  );
};

export default Auditory;