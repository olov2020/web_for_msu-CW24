import {useEffect, useState} from "react";
import {getAllCoursesIds} from "../../api/adminApi.js";
import TeacherMarks from "../courses/marks/TeacherMarks.jsx";


const Marks = () => {

  const [coursesIds, setCoursesIds] = useState([
    {
      id: 0,
      name: 'Course1',
    },
    {
      id: 0,
      name: 'Course1',
    },
    {
      id: 0,
      name: 'Course1',
    },
  ]);

  /*useEffect(() => {
    const getAllCoursesIdsFunc = async () => {
      const data = await getAllCoursesIds();
      setCoursesIds(data);
    }

    getAllCoursesIdsFunc();
  }, []);*/

  return (
    <article>
      <h1>Список всех ведомостей</h1>

      {coursesIds.map((course) => (
        <section key={course.id} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '1rem 0',
          marginBottom: '5rem',
        }}>
          <h2>{course.name}</h2>
          <TeacherMarks courseId={course.id}/>
        </section>
      ))}
    </article>
  );
};

export default Marks;