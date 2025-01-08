import {useEffect, useState} from 'react';
import {getTeacherMarksByCourseId} from "../../../api/coursesApi.js";
import style from './teacherMarks.module.css';
import Form from "../../../generic/form/Form.jsx";

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
    ],
    "pupils": [
      {
        "id": 1,
        "name": "Doe John Ivanovich",
        "marks": [
          ["Н", 10],
          ["Н", 4],
          ["Н", 4],
          ["Н", 4],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
          ["", ''],
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
      const data = await getTeacherMarksByCourseId({courseId});
      setMarks(data);
    }

    getMarks();
  }, [])*/

  const [inputs, setInputs] = useState([]);
  const [values, setValues] = useState({});

  useEffect(() => {
    const inputsNew = marks.dates.flatMap((date) =>
      marks.pupils.flatMap((pupil) =>
        marks.mark_type_choices.map((markType) =>
          `${pupil.id} ${date} ${markType}`
        )
      )
    );
    setInputs(inputsNew);

    const valuesNew = marks.dates.reduce((acc, date, index) => {
      marks.pupils.forEach((pupil) => {
        marks.mark_type_choices.forEach((markType, index2) => {
          acc[`${pupil.id} ${date} ${markType}`] = pupil.marks[index][index2];
        });
      });
      return acc;
    }, {});

    setValues(valuesNew);
  }, [marks]);

  if (!marks) {
    return <></>;
  }

  return (
    <section style={{
      maxWidth: "90%",
      overflow: 'auto',
      paddingBottom: '1rem',
    }}>
      <section className={style.datesSection}>
        {marks.dates.map((date, index) => (
          <div key={index} className={style.column}>
            <h3 key={index} className={style.date}>{date}</h3>

            <div className={style.markTypes}>
              {marks.mark_type_choices.map((mark_type, index) => (
                <p key={index}>{mark_type}</p>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Form buttonText='Сохранить оценки' inputs={inputs} values={values} type='saveTeacherMarks' id={courseId}/>
    </section>
  );
};

export default TeacherMarks;