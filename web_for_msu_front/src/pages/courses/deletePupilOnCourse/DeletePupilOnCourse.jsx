import {useEffect, useState} from "react";
import {
  deletePupilsOnCourse,
  getPupilsOnCourseToDelete,
} from "../../../api/coursesApi.js";
import InputText from "../../../generic/form/inputs/userInputs/InputText.jsx";
import style from './addPupilOnCourse.module.css';
import {useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const DeletePupilOnCourse = ({courseId}) => {
  const [pupils, setPupils] = useState([]);

  const [value, setValue] = useState('');
  const {pathname} = useLocation();

  useEffect(() => {
    const getPupilsOnCourseToDeleteFunc = async () => {
      const data = await getPupilsOnCourseToDelete({courseId});
      setPupils(data);
    };

    getPupilsOnCourseToDeleteFunc();
  }, [pathname, courseId]);

  const filteredPupils = pupils.filter(pupil =>
    pupil.name.toLowerCase().includes(value.toLowerCase())
  );

  const deletePupilsOnCourseFunc = async (pupilId) => {

    try {
      await deletePupilsOnCourse({courseId, pupilId});
      alert('Ученик успешно удален с курса!');
      setValue('');
    } catch {
      alert('Упс... что-то пошло не так. Скорее всего ученик выбрал курс зачетным, в связи с чем отчисление с курса равно отчисления из школы. За отчислением ученика обратитесь к администратору');
    }
  }

  return (
    <section>
      <h2 style={{
        textAlign: "center",
        marginBottom: "1rem",
      }}>Удаление учеников с курса</h2>
      <InputText
        name='delete pupils'
        placeholder='Начните вводить ФИО ученика'
        value={value}
        setValue={setValue}
      />
      {value && filteredPupils.map(pupil => (
        <h3 key={pupil.id} onClick={() => deletePupilsOnCourseFunc(pupil.id)}
            className={style.addPupils}
        >{pupil.name} - {pupil.grade} класс</h3>
      ))}
    </section>
  );
};

export default DeletePupilOnCourse;
