import {useEffect, useState} from "react";
import {getPupilMarksByCourseId} from "../../api/coursesApi.js";
import style from './marks.module.css'

// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [marks, setMarks] = useState({
    course_name: "Приручение python'а",
    dates: [
      "03.10.2024",
      "10.10.2024",
      "17.10.2024",
      "24.10.2024"
    ],
    mark_types: [
      "Присутствие",
      "домашняя работа",
      "Баллы",
      "Баллы"
    ],
    marks: [
      "Н",
      "4",
      "Н",
      "10"
    ],
    result: 12.6,
    skips: 2
  });

  /*useEffect(() => {
    const getMarks = async () => {
      const data = await getPupilMarksByCourseId({courseId});
      setMarks(data.marks);
    }

    getMarks();
  }, [])*/

  return (
    <table key={courseId} className={style.tablePupil}>
      <caption>
        <h2>Ведомость оценок</h2>
      </caption>

      <thead>
      <tr>
        {marks.dates.map((date, index) => (
          <th key={index}>{date}</th>
        ))}
      </tr>
      </thead>

      <tbody>
      <tr>
        {marks.marks.map((mark, index) => (
          <td key={index}>{mark}</td>
        ))}
      </tr>
      </tbody>

      <tfoot>
      <tr>
        <th scope="row" colSpan={marks.dates.length - 1}>Итоговая оценка</th>
        <td>{marks.result}</td>
      </tr>
      <tr>
        <th scope="row" colSpan={marks.dates.length - 1}>Общее количество пропусков</th>
        <td>{marks.skips}</td>
      </tr>
      </tfoot>
    </table>
  );
};

export default PupilMarks;