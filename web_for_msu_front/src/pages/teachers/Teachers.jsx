import {useEffect, useState} from "react";
import {getDirectoryTeachers} from "../../api/userApi.js";


const Teachers = () => {

  const [teachers, setTeachers] = useState({
    'directory': [
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
    ],
    'council': [
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
    ],
    'teachers': [
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
    ],
    'organizers': [
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
      {id: 0, name: 'Ivanov Ivan Ivanovich'},
    ],
  });

  const teachersList = Object.entries(teachers);
  console.log(teachersList)

  const titles = ['Дирекция', 'Совет', 'Преподаватели', 'Организаторы'];

  useEffect(() => {
    const getAllTeachersFunc = async () => {
      const data = await getDirectoryTeachers();
      setTeachers(data);
    }

    getAllTeachersFunc();
  }, []);

  console.log(teachers[0]);

  return (
    <article>
      <h1>Преподаватели и дирекция ЭМШ</h1>

      {teachersList.map((teacherGroup, index) => (
        <section key={index}>
          <h2>{titles[index]}</h2>
          <ul>
            {teacherGroup[1].map((teacher, teacherIndex) => (
              <li key={teacherIndex} style={{
                listStyle: 'none'
              }}>
                <h3>{teacher.name}</h3>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
};

export default Teachers;