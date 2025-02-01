import {useEffect, useState} from "react";
import {getPupilMarksByCourseId, getPupilMarksByCourseId2} from "../../../api/coursesApi.js";
import style from './pupilMarks.module.css';

// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [marks, setMarks] = useState(undefined);
  const [marks2, setMarks2] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getMarks = async () => {
        try {
          const data = await getPupilMarksByCourseId({courseId});
          setMarks(data);
        } catch {
          setMarks2(null);
        }
      }

      getMarks();

      const getMarks2 = async () => {
        try {
          const data = await getPupilMarksByCourseId2({courseId});
          setMarks2(data);
        } catch {
          setMarks2(null);
        }
      }

      getMarks2();
    } finally {
      setLoading(false);
    }
  }, [courseId])

  if (loading) {
    return <></>;
  }

  if (!marks) {
    return <h3>Оценок пока нет</h3>;
  }

  return (
    <>
      {marks2 &&
        <section className={style.marksSection}>
          <section className={style.markTypes}>
            <h3>Тип оценки / Даты</h3>
            {marks2.mark_type_choices && marks2.mark_type_choices.length !== 0 && marks2.mark_type_choices.map((markType) => (
              <h3 key={markType}><span>{markType}</span></h3>
            ))}
          </section>

          <section className={style.marks}>
            {marks2.dates && marks2.dates.length !== 0 && marks2.dates.map((date, dateIndex) => (
              <div key={dateIndex}>
                <h3>{date}</h3>
                {marks2.marks && marks2.marks.length > 0 && marks2.marks[dateIndex] && marks2.marks[dateIndex].length !== 0 && marks2.marks[dateIndex].map((mark, markIndex) =>
                  (mark === '' ?
                      <h3 key={`${dateIndex}-${markIndex}`}>-</h3> :
                      <h3 key={`${dateIndex}-${markIndex}`}>{mark}</h3>
                  ))}
              </div>
            ))}
          </section>

          <section className={style.results}>
            <h3><span>Предварительный итог</span> - {marks2.result ? marks2.result : 'оценка отсутствует'}</h3>
            <h3><span>Итог</span> - {marks2.teacher_result ? marks2.teacher_result : 'оценка отсутствует'}</h3>
          </section>
        </section>
      }

      <section className={style.marksSection}>
        <section className={style.markTypes}>
          <h3>Тип оценки / Даты</h3>
          {marks.mark_type_choices && marks.mark_type_choices.length !== 0 && marks.mark_type_choices.map((markType) => (
            <h3 key={markType}><span>{markType}</span></h3>
          ))}
        </section>

        <section className={style.marks}>
          {marks.dates && marks.dates.length !== 0 && marks.dates.map((date, dateIndex) => (
            <div key={dateIndex}>
              <h3>{date}</h3>
              {marks.marks && marks.marks.length > 0 && marks.marks[dateIndex] && marks.marks[dateIndex].length !== 0 && marks.marks[dateIndex].map((mark, markIndex) =>
                (mark === '' ?
                    <h3 key={`${dateIndex}-${markIndex}`}>-</h3> :
                    <h3 key={`${dateIndex}-${markIndex}`}>{mark}</h3>
                ))}
            </div>
          ))}
        </section>

        <section className={style.results}>
          <h3><span>Предварительный итог</span> - {marks.result ? marks.result : 'оценка отсутствует'}</h3>
          <h3><span>Итог</span> - {marks.teacher_result ? marks.teacher_result : 'оценка отсутствует'}</h3>
        </section>
      </section>
    </>
  )
    ;
};

export default PupilMarks;