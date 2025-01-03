import {useEffect, useState} from "react";
import Form from "../../generic/form/Form.jsx";
import InputText from "../../generic/form/inputs/userInputs/InputText.jsx";

const Auditory = () => {

  const [courses, setCourses] = useState([
    {id: 0, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: ''},
    {id: 1, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: 4},
    {id: 2, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: 123},
    {id: 3, name: 'Приручение питона', lesson_time: 'alskdalsdk', auditory: 'lkajslawhfwioeunf2wieiufh2938rhreonjco2'},
  ]);
  const [auditoriums, setAuditoriums] = useState([]);

  useEffect(() => {

    const auditoriumsNews = courses.map((course) => {
      return `auditory ${course.id} ${course.auditory}`;
    })
    setAuditoriums(auditoriumsNews);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <article>
      <h1>Назначение аудиторий</h1>

      <form onSubmit={onSubmit} style={{
        width: '60%',
      }}>
          {courses && courses.length > 0 && courses.map((course) => (
            <div key={course.id} style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}>
              <h3>{course.name}</h3>
              <p>{course.lesson_time}</p>
              <InputText/>
            </div>
          ))}
      </form>
    </article>
  );
};

export default Auditory;