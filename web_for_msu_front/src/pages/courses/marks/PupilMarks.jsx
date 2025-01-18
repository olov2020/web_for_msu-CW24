import {useEffect, useState} from "react";
import {getPupilMarksByCourseId, getPupilMarksByCourseId2} from "../../../api/coursesApi.js";
import style from './pupilMarks.module.css';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
const PupilMarks = ({courseId}) => {

  const [marks, setMarks] = useState({});

  const [marks2, setMarks2] = useState({});
  const {pathname} = useLocation();
  const authStatus = useSelector((state) => state.user.authStatus);

  useEffect(() => {
    const getMarks = async () => {
      const data = await getPupilMarksByCourseId({courseId});
      setMarks(data);
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
  }, [pathname, authStatus])

  if (!marks) {
    return <h3>Оценок пока нет</h3>;
  }

  return (
    <>
      {marks2 &&
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
            marginTop: '5rem',
            gap: '2.2rem 0',
            width: 'auto',
          }}>
            {marks2.dates && marks2.dates.length !== 0 && marks2.dates.map((date) => (
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
              {marks2.mark_type_choices && marks2.mark_type_choices.length !== 0 && marks2.mark_type_choices.map((markType, index) => (
                <h3 key={index}>{markType}</h3>
              ))}
            </section>

            <section style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem 0',
            }}>
              {marks2.marks && marks2.marks.length !== 0 && marks2.marks.map((marksRow, rowIndex) => (
                <div key={rowIndex} className={style.row}>
                  {marksRow.map((mark, markIndex) => (
                    <p key={markIndex}>{mark}</p>
                  ))}
                </div>
              ))}

              <h3>Предварительный итог - {marks2.result}</h3>
              <h3>Итог - {marks2.teacher_result}</h3>
            </section>
          </section>
        </section>
      }

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
          marginTop: '5rem',
          gap: '2.2rem 0',
          width: 'auto',
        }}>
          {marks.dates && marks.dates.length !== 0 && marks.dates.map((date) => (
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
            {marks.mark_type_choices && marks.mark_type_choices.length !== 0 && marks.mark_type_choices.map((markType, index) => (
              <h3 key={index}>{markType}</h3>
            ))}
          </section>

          <section style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem 0',
          }}>
            {marks.marks && marks.marks.length !== 0 && marks.marks.map((marksRow, rowIndex) => (
              <div key={rowIndex} className={style.row}>
                {marksRow.map((mark, markIndex) => (
                  <p key={markIndex}>{mark}</p>
                ))}
              </div>
            ))}

            <h3>Предварительный итог - {marks.result}</h3>
            <h3>Итог - {marks.teacher_result}</h3>
          </section>
        </section>


      </section>
    </>
  );
};

export default PupilMarks;