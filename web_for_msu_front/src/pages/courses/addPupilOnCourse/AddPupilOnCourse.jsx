import {useEffect, useState} from "react";
import {getPupilsOnCourse, setPupilsOnCourse} from "../../../api/coursesApi.js";
import InputText from "../../../generic/form/inputs/userInputs/InputText.jsx";
import style from './addPupilOnCourse.module.css';

// eslint-disable-next-line react/prop-types
const AddPupilOnCourse = ({courseId}) => {
  const [pupils, setPupils] = useState([
    {id: 0, name: 'Виноградов Владимир Андреевич', grade: 11},
    {id: 0, name: 'Виноградов Владимир Андреевич', grade: 11},
    {id: 0, name: 'Виноградов Владимир Андреевич', grade: 11},
    {id: 0, name: 'Виноградов Владимир Андреевич', grade: 11},
  ]);

  const [value, setValue] = useState('');

  useEffect(() => {
    const getPupilsOnCourseFunc = async () => {
      const data = await getPupilsOnCourse({courseId});
      setPupils(data);
    };

    getPupilsOnCourseFunc();
  }, [courseId]); // Use courseId as dependency to avoid infinite loop

  const filteredPupils = pupils.filter(pupil =>
    pupil.name.toLowerCase().includes(value.toLowerCase())
  );

  const setPupilsOnCourseFunc = async (pupilId) => {

    try {
      await setPupilsOnCourse({courseId, pupilId});
      alert('Ученик успешно добавлен на курс!');
      setValue('');
    } catch {
      alert('Упс... что-то пошло не так');
    }
  }

  return (
    <section>
      <h2 style={{
        textAlign: "center",
        marginBottom: "1rem",
      }}>Ручное добавление учеников</h2>
      <InputText
        name='search pupils'
        placeholder='Начните вводить ФИО ученика'
        value={value}
        setValue={setValue}
      />
      {value && filteredPupils.map(pupil => (
        <h3 key={pupil.id} onClick={() => setPupilsOnCourseFunc(pupil.id)}
            className={style.addPupils}
        >{pupil.name}</h3>
      ))}
    </section>
  );
};

export default AddPupilOnCourse;
