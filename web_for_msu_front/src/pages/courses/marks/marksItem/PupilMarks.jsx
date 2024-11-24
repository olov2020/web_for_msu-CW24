import {useEffect, useState} from "react";
import {getPupilMarksByCourseId} from "../../../../api/coursesApi.js";


// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [dates, setDates] = useState(['as', 'asd', 'asd']);
  const [markTypes, setMarkTypes] = useState([]);
  const [marks, setMarks] = useState(['ke', 'we', 'we']);
  const [result, setResult] = useState('1243');
  const [skips, setSkips] = useState('as');

  /*useEffect(() => {
    const getMarks = async () => {
      const data = await getPupilMarksByCourseId({courseId});
      setDates(data.dates);
      setMarkTypes(data.mark_types);
      setMarks(data.marks);
      setResult(data.result);
      setSkips(data.skips);
    }

    getMarks();
  }, [])*/

  return (
    <table key={courseId}>
      <caption>
        <h3>Ведомость оценок</h3>
      </caption>

      <thead>
      <tr>
        {dates.map((date, index) => (
          <th key={index}>{date}</th>
        ))}
      </tr>
      </thead>

      <tbody>
      <tr>
        {marks.map((mark, index) => (
          <td key={index}>{mark}</td>
        ))}
      </tr>
      </tbody>
      
      <tfoot>
      <tr>
        <th scope="row" colSpan={dates.length - 1}>Итоговая оценка</th>
        <td>{result}</td>
      </tr>
      <tr>
        <th scope="row" colSpan={dates.length - 1}>Общее количество пропусков</th>
        <td>{skips}</td>
      </tr>
      </tfoot>
    </table>
  );
};

export default PupilMarks;