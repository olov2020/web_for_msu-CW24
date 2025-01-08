import {useEffect, useState} from "react";
import {approvePupilsOnCourse, deletePupilsFromCourse, getAllPupilsOnCourse} from "../../../api/coursesApi.js";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";

// eslint-disable-next-line react/prop-types
const ApprovePupils = ({courseId}) => {

  const [pupils, setPupils] = useState([
    {id: 0, name: 'Ivanov Ivan Ivanovich', grade: 8},
    {id: 0, name: 'Ivanov Ivan Ivanovich', grade: 8},
    {id: 0, name: 'Ivanov Ivan Ivanovich', grade: 8},
    {id: 0, name: 'Ivanov Ivan Ivanovich', grade: 8},
  ])

  useEffect(() => {
    const getAllPupilsOnCourseFunc = async () => {
      const data = await getAllPupilsOnCourse({courseId});
      setPupils(data)
    }

    getAllPupilsOnCourseFunc();
  }, []);

  const handleApprovePupils = async () => {
    const data = await approvePupilsOnCourse();
    data ? alert('Ученик успешно принят на курс') : alert('Упс... Что-то пошло не так');
  }

  const handleDeletePupils = async () => {
    const data = await deletePupilsFromCourse();
    data ? alert('Ученик успешно принят на курс') : alert('Упс... Что-то пошло не так');
  }

  if (!pupils || pupils.length === 0) {
    return <></>
  }

  return (
    <section style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '.5rem 0',
    }}>
      <h2 style={{
        texAlign: 'center',
        alignSelf: 'center',
        margin: '2rem 0',
      }}>Список учеников, ожидающих принятие на курс</h2>

      {pupils.map((pupil) => (
        <div key={pupil.id} style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          <h3>{pupil.name} - {pupil.grade} класс</h3>

          <div style={{
            display: 'flex',
            width: '25%',
            gap: '0 2rem',
          }}>
            <ButtonSubmit text='Принять' onClick={() => handleApprovePupils()}/>
            <ButtonSubmit text='Не принять' type='delete' onClick={() => handleDeletePupils()}/>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApprovePupils;