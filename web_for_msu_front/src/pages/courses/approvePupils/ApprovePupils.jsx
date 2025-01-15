import {useEffect, useState} from "react";
import {approvePupilsOnCourse, deletePupilsFromCourse, getAllPupilsOnCourse} from "../../../api/coursesApi.js";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import {useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ApprovePupils = ({courseId}) => {

  const [pupils, setPupils] = useState([])
  const {pathname} = useLocation();
  const [updatePupils, setUpdatePupils] = useState(false);

  useEffect(() => {
    const getAllPupilsOnCourseFunc = async () => {
      const data = await getAllPupilsOnCourse({courseId});
      setPupils(data)
    }

    getAllPupilsOnCourseFunc();
  }, [pathname, updatePupils]);

  const handleApprovePupils = async (pupilId) => {
    const data = await approvePupilsOnCourse({courseId, pupilId});
    if (data) {
      setUpdatePupils(!updatePupils);
      alert('Ученик успешно принят на курс');
    } else {
      alert('Упс... Что-то пошло не так');
    }
  }

  const handleDeletePupils = async (pupilId) => {
    const data = await deletePupilsFromCourse({courseId, pupilId});
    if (data) {
      setUpdatePupils(!updatePupils);
      alert('Ученик успешно удален с курса');
    } else {
      alert('Упс... Что-то пошло не так');
    }
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
            <ButtonSubmit text='Принять' onClick={() => handleApprovePupils(pupil.id)}/>
            <ButtonSubmit text='Не принять' type='delete' onClick={() => handleDeletePupils(pupil.id)}/>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApprovePupils;