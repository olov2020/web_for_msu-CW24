import {useEffect, useState} from "react";
import {getPupilMarksByCourseId, getPupilMarksByCourseId2} from "../../../api/coursesApi.js";
import style from './teacherMarks.module.css';
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
        <section className={style.marksSection}>
          <section className={style.datesSection}>
            {marks2.dates.length !== 0 && marks2.dates.map((date, index) => (
              <h3 key={index}>{date}</h3>
            ))}
          </section>

          <section className={style.markTypesSection}>
            {marks2.mark_type_choices.length !== 0 && marks2.mark_type_choices.map((markType) => (
              <section key={markType} className={style.markType}>
                <h3>{markType}</h3>

                <section className={style.marks}>
                  {marks2.marks.length !== 0 && marks2.marks.map((markArray, index) => (
                    <div key={index}>
                      {markArray.map((mark) => (
                        <p key={mark}>{mark}</p>
                      ))}
                    </div>
                  ))}
                </section>
              </section>
            ))}
          </section>

          <section className={style.results}>
            <h3>Предварительный итог - {marks2.result}</h3>
            <h3>Итог - {marks2.teacher_result}</h3>
          </section>
        </section>
      }

      <section className={style.marksSection}>
        <section className={style.datesSection}>
          {marks.dates.length !== 0 && marks.dates.map((date) => (
            <h3 key={date}>{date}</h3>
          ))}
        </section>

        <section className={style.markTypesSection}>
          {marks.mark_type_choices.length !== 0 && marks.mark_type_choices.map((markType) => (
            <section key={markType} className={style.markType}>
              <h3>{markType}</h3>

              <section className={style.marks}>
                {marks.marks.length !== 0 && marks.marks.map((mark) => (
                  <p key={mark}>{mark}</p>
                ))}
              </section>
            </section>
          ))}
        </section>

        <section className={style.results}>
          <h3>Предварительный итог - {marks.result}</h3>
          <h3>Итог - {marks.teacher_result}</h3>
        </section>
      </section>
    </>
  );
};

export default PupilMarks;