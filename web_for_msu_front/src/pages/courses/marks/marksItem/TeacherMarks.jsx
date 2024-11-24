import {useEffect, useState} from 'react';
import {getTeacherMarksByCourseId, updateTeacherMarksByCourseId} from "../../../../api/coursesApi.js";
import style from '../marks.module.css'
import Input from "../../../../generic/form/inputs/Input.jsx";

const TeacherMarks = ({courseId}) => {

  const [dates, setDates] = useState([
    "03.10.2024",
    "10.10.2024",
    "17.10.2024",
    "24.10.2024",
    "31.10.2024",
    "07.11.2024",
    "14.11.2024",
    "21.11.2024",
    "28.11.2024",
    "05.12.2024",
    "12.12.2024",
    "19.12.2024",
    "26.12.2024",
    "30.01.2025",
    "06.02.2025",
    "13.02.2025",
    "20.02.2025",
    "27.02.2025",
    "06.03.2025",
    "13.03.2025",
    "20.03.2025",
    "27.03.2025",
    "03.04.2025",
    "10.04.2025",
    "17.04.2025"
  ],);
  const [markTypes, setMarkTypes] = useState([
    "Присутствие",
    "домашняя работа",
    "Баллы",
    "Баллы",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие",
    "Присутствие"
  ]);
  const [markTypeChoices, setMarkTypeChoices] = useState([
    "домашняя работа",
    "экзамен",
    "Баллы",
    "Присутствие"
  ]);
  const [pupils, setPupils] = useState([{
    "id": 1,
    "name": "Doe John Ivanovich",
    "marks": [
      "Н",
      "4",
      "Н",
      "10",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "result": 12.6
  },
  ]);
  const [marks, setMarks] = useState([
    "Н",
    "4",
    "Н",
    "10",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  const [visits, setVisits] = useState([
    "0",
    "1",
    "0",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1",
    "1"
  ]);
  const [averages, setAverages] = useState([
    0,
    4,
    0,
    10,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);

  /*useEffect(() => {
    const getMarks = async () => {
      const data = await getTeacherMarksByCourseId({courseId});
      setDates(data.dates);
      setMarkTypes(data.mark_types);
      setMarkTypeChoices(data.mark_type_choices);
      setPupils(data.pupils);
      setMarks(data.pupils.marks);
      setVisits(data.visits);
      setAverages(data.averages);
    }

    getMarks();
  }, [])

  useEffect(() => {
    const updateMarks = async () => {
      const mark_type_choices = markTypeChoices;
      const mark_types = markTypes;
      pupils.marks = marks;
      const data = await updateTeacherMarksByCourseId({
        courseId,
        dates,
        mark_type_choices,
        mark_types,
        pupils,
        visits,
        averages
      });
      setDates(data.dates);
      setMarkTypes(data.mark_types);
      setMarkTypeChoices(data.mark_type_choices);
      setPupils(data.pupils);
      setVisits(data.visits);
      setAverages(data.averages);
    }

    updateMarks();
  }, [pupils, marks])*/

  return (
    <table className={style.teacherTable}>
      <caption>
        <h3>Ведомость оценок</h3>
      </caption>

      <thead>
      <tr>
        <th className={style.teacherColumn}></th>
        {dates.map((date, index) => (
          <th className={style.teacherColumn} key={index}>{date}</th>
        ))}
      </tr>
      </thead>

      <tbody>
      {pupils.map((pupil) => (
        <tr key={pupil.id}>
          <th scope="row">{pupil.name}</th>
          {marks.map((mark, index) => (
            <td key={index}>
              <Input value={mark} type='text' onChange={(e) => setMarkTypes([...marks, e.target.value])}/>
            </td>
          ))}
        </tr>
      ))}
      </tbody>

      <tfoot>
      <tr>
        <th scope="row">Средняя оценка</th>
        {averages.map((average, index) => (
          <td key={index}>{average}</td>
        ))}
      </tr>
      <tr>
        <th scope="row">Общее количество посещений</th>
        {visits.map((visit, index) => (
          <td key={index}>{visit}</td>
        ))}
      </tr>
      </tfoot>
    </table>
  );
};

export default TeacherMarks;