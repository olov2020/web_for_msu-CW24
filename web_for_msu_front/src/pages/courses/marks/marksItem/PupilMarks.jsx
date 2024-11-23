import {useEffect, useState} from "react";
import {getPupilMarksByCourseId} from "../../../../api/coursesApi.js";


// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [dates, setDates] = useState([]);
  const [markTypes, setMarkTypes] = useState([]);
  const [marks, setMarks] = useState([]);
  const [result, setResult] = useState('');
  const [skips, setSkips] = useState('');

  useEffect(() => {
    const getMarks = async () => {
      const data = await getPupilMarksByCourseId({courseId});
      setDates(data.dates);
      setMarkTypes(data.mark_types);
      setMarks(data.marks);
      setResult(data.result);
      setSkips(data.skips);
    }

    getMarks();
  }, [])

  return (
      <table key={courseId}>
        <caption>
          Ведомость оценок
        </caption>

        <thead>
        <tr>
          <th scope="col"></th>
          {dates.map((date) => {
            <th scope="col">{date}</th>
          })}
        </tr>
        </thead>

        <tbody>
        <tr>
          <th scope="row">Chris</th>
          <td>HTML tables</td>
          <td>22</td>
        </tr>
        <tr>
          <th scope="row">Dennis</th>
          <td>Web accessibility</td>
          <td>45</td>
        </tr>
        <tr>
          <th scope="row">Sarah</th>
          <td>JavaScript frameworks</td>
          <td>29</td>
        </tr>
        <tr>
          <th scope="row">Karen</th>
          <td>Web performance</td>
          <td>36</td>
        </tr>
        </tbody>

        <tfoot>
        <tr>
          <th scope="row" colSpan="2">Average age</th>
          <td>33</td>
        </tr>
        </tfoot>
      </table>
  );
};

export default PupilMarks;