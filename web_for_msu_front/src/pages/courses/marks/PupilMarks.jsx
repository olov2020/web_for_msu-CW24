import {useEffect, useState} from "react";
import {getPupilMarksByCourseId} from "../../../api/coursesApi.js";
import style from './pupilMarks.module.css';

// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [marks, setMarks] = useState({
    'dates': [
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
      "17.04.2025",
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
      "17.04.2025",
    ],
    "mark_type_choices": [
      "домашняя работа",
      "экзамен",
      "контрольная работа",
      "летучка",
    ],
    'marks': [
      ["Н", 112312310, 1, 1],
      ["Н", 3, 234, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 112312310, 1, 1],
      ["Н", 3, 234, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
      ["Н", 10, 1, 1],
    ],
    result: 12.6,
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
    return <h3>Оценок пока нет</h3>;
  }

  return (
    <section style={{
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '90%',
      gap: '0 2rem',
    }}>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '3.5rem',
        gap: '2.2rem 0',
        width: 'auto',
      }}>
        {marks.dates.map((date) => (
          <h3 key={date}>{date}</h3>
        ))}
      </section>

      <section style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem 0',
      }}>
        <section className={style.row} style={{
          border: 'none',
        }}>
          {marks.mark_type_choices.map((markType, index) => (
            <h3 key={index}>{markType}</h3>
          ))}
        </section>

        <section style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem 0',
        }}>
          {marks.marks.map((marksRow, rowIndex) => (
            <div key={rowIndex} className={style.row}>
              {marksRow.map((mark, markIndex) => (
                <p key={markIndex}>{mark}</p>
              ))}
            </div>
          ))}

          <h3>Итог - {marks.result}</h3>
        </section>
      </section>


    </section>
  );
};

export default PupilMarks;