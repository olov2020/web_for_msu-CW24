import {useEffect, useState} from 'react';
import {
  getTeacherMarksByCourseId,
  updateTeacherMarksByCourseId
} from "../../../api/coursesApi.js";
import Input from "../../../generic/form/inputs/Input.jsx";
import InputDropdown from "../../../generic/form/inputs/userInputs/InputDropdown.jsx";

// eslint-disable-next-line react/prop-types
const TeacherMarks = ({courseId}) => {

  const [marks, setMarks] = useState({
    "dates": [
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
    ],
    "mark_type_choices": [
      "домашняя работа",
      "экзамен",
      "Баллы",
      "Присутствие"
    ],
    "mark_types": [
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
    ],
    "pupils": [
      {
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
      }
    ],
    "visits": [
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
    ],
    "averages": [
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
    ]
  });

  /*useEffect(() => {
    const getMarks = async () => {
      try {
        const data = await getTeacherMarksByCourseId({courseId});
        setMarks(data.pupils.marks);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setMarks(null);
      }
    }

    getMarks();
  }, [marks])*/

  const setPupilMark = async (e, pupilIndex, index) => {
    marks.pupils[pupilIndex].marks[index] = e.target.value;
    const data = await updateTeacherMarksByCourseId(courseId, marks);
    setMarks(data);
  }

  const setMarkTypes = async (e, index) => {
    marks.mark_types[index] = e.target.value;
    const data = await updateTeacherMarksByCourseId(courseId, marks);
    setMarks(data);
  }

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
        <tr>
          <span></span>
          {marks.mark_types.map((markType, index) => (
            <td key={index}>
              <InputDropdown value={markType} setValue={(e) => setMarkTypes(e, index)} values={marks.mark_type_choices}
                             style={{
                               textAlign: 'center',
                             }}/>
            </td>
          ))}
        </tr>
        </thead>

        <tbody>
        {marks.pupils.map((pupil, pupilIndex) => (
          <tr key={pupil.id}>
            <th scope="row"><span style={{
              fontSize: '1.2rem',
              color: 'black',
            }}>{pupil.name}</span></th>
            {pupil.marks.map((mark, index) => (
              <td key={index}>
                <Input value={mark} type='text' name={`markAt${pupil.id}${index}`}
                       onChange={(e) => setPupilMark(e, pupilIndex)} style={{
                  textAlign: 'center',
                }}/>
              </td>
            ))}
          </tr>
        ))}
        </tbody>

        <tfoot>
        <tr>
          <th scope="row"><span>Средняя оценка</span></th>
          {marks.averages.map((average, index) => (
            <td key={index}>{average}</td>
          ))}
        </tr>
        <tr>
          <th scope="row"><span>Общее количество посещений</span></th>
          {marks.visits.map((visit, index) => (
            <td key={index}>{visit}</td>
          ))}
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TeacherMarks;