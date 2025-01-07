import {useEffect, useState} from "react";
import {getPupilMarksByCourseId} from "../../../api/coursesApi.js";

// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [marks, setMarks] = useState({
    course_name: "Приручение python'а",
    dates: [
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024",
    ],
    mark_types: [
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы",
    ],
    marks: [
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
      "Н",
      "4",
      "Н",
      "10",
    ],
    result: 12.6,
    skips: 2
  });

  /*useEffect(() => {
    const getMarks = async () => {
      try {
        const data = await getPupilMarksByCourseId({courseId});
        setMarks(data.marks);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setMarks(null);
      }
    }

    getMarks();
  }, [])*/

  if (!marks) {
    return <></>;
  }

  return (
    <div style={{
      maxWidth: "90%",
      overflow: 'auto',
    }}>
      <table key={courseId}>

        <thead>
        <tr>
          <span></span>
          {marks.dates.map((date, index) => (
            <th key={index}>{date}</th>
          ))}
        </tr>
        </thead>

        <tbody>
        <tr>
          <span></span>
          {marks.marks.map((mark, index) => (
            <td key={index} style={{
              textAlign: "center",
            }}>{mark}</td>
          ))}
        </tr>
        </tbody>
      </table>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0 1rem',
        marginTop: '2rem',
      }}>
        <span>Итоговая оценка</span>
        <h4>{marks.result}</h4>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0 1rem',
        margin: '.5rem 0',
      }}>
        <span>Общее количество пропусков</span>
        <h4>{marks.skips}</h4>
      </div>
    </div>
  );
};

export default PupilMarks;