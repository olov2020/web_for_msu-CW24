import {useEffect, useState} from "react";
import {getAllPupilsOnCourse} from "../../../api/coursesApi.js";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";


// eslint-disable-next-line react/prop-types
const ApprovePupils = ({courseId}) => {

  const [pupils, setPupils] = useState([
    {id: 0, name: 'Ivanov Ivan Ivanovich'},
    {id: 0, name: 'Ivanov Ivan Ivanovich'},
    {id: 0, name: 'Ivanov Ivan Ivanovich'},
    {id: 0, name: 'Ivanov Ivan Ivanovich'},
  ])

  useEffect(() => {
    const getAllPupilsOnCourseFunc = async () => {
      const data = await getAllPupilsOnCourse({courseId});
      setPupils(data)
    }

    getAllPupilsOnCourseFunc();
  }, []);

  if (!pupils || pupils.length === 0) {
    return <></>
  }

  return (
    <section style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
          justifyContent: 'space-between',
        }}>
          <h3>{pupil.name}</h3>

          <div style={{
            display: 'flex',
            width: '40%',
            gap: '0 2rem',
          }}>
            <ButtonSubmit text='Принять'/>
            <ButtonSubmit text='Не принять' type='delete'/>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApprovePupils;