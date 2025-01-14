import {useEffect, useState} from 'react';
import {getTeacherMarksByCourseId, getTeacherMarksByCourseId2} from "../../../api/coursesApi.js";
import style from './teacherMarks.module.css';
import Form from "../../../generic/form/Form.jsx";
import {useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TeacherMarks = ({courseId}) => {

  const [marks, setMarks] = useState({});
  const {pathname} = useLocation();

  const [marks2, setMarks2] = useState(undefined);

  useEffect(() => {
    const getMarks = async () => {
      const data = await getTeacherMarksByCourseId({courseId});
      setMarks(data);
    }

    getMarks();

    /*const getMarks2 = async () => {
      try {
        const data = await getTeacherMarksByCourseId2({courseId});
        setMarks2(data);
      } catch {
        setMarks2(null);
      }
    }

    getMarks2();*/
  }, [pathname])

  const [inputs, setInputs] = useState({});
  const [values, setValues] = useState({});
  /*const [inputs2, setInputs2] = useState({});
  const [values2, setValues2] = useState({});*/

  useEffect(() => {
    const inputsNew = marks.dates.flatMap((date) =>
      marks.pupils.flatMap((pupil) =>
        marks.mark_type_choices.map((markType) =>
          `${pupil.id} ${date} ${markType}`
        )
      )
    );

    marks.dates.forEach((date) => {
      inputsNew.push(`visits ${date}`)
    })

    const inputsDict = inputsNew.reduce((acc, input) => {
      const [pupilId] = input.split(' ');
      if (!acc[pupilId]) {
        acc[pupilId] = [];
      }
      acc[pupilId].push(input);
      return acc;
    }, {});

    setInputs(inputsDict);

    const valuesNew = marks.dates.reduce((acc, date, index) => {
      marks.pupils.forEach((pupil) => {
        marks.mark_type_choices.forEach((markType, index2) => {
          acc[`${pupil.id} ${date} ${markType}`] = pupil.marks[index][index2];
        });
      });
      return acc;
    }, {});

    marks.dates.forEach((date, index) => {
      valuesNew[`visits ${date}`] = marks.visits[index];
    })

    setValues(valuesNew);

  }, [marks]);


  console.log(marks)

  /*useEffect(() => {
    const inputsNew = marks2.dates.flatMap((date) =>
      marks2.pupils.flatMap((pupil) =>
        marks2.mark_type_choices.map((markType) =>
          `${pupil.id} ${date} ${markType}`
        )
      )
    );

    marks2.dates.forEach((date) => {
      inputsNew.push(`visits ${date}`)
    })

    const inputsDict = inputsNew.reduce((acc, input) => {
      const [pupilId] = input.split(' ');
      if (!acc[pupilId]) {
        acc[pupilId] = [];
      }
      acc[pupilId].push(input);
      return acc;
    }, {});

    setInputs2(inputsDict);

    const valuesNew = marks2.dates.reduce((acc, date, index) => {
      marks2.pupils.forEach((pupil) => {
        marks2.mark_type_choices.forEach((markType, index2) => {
          acc[`${pupil.id} ${date} ${markType}`] = pupil.marks[index][index2];
        });
      });
      return acc;
    }, {});

    marks2.dates.forEach((date, index) => {
      valuesNew[`visits ${date}`] = marks2.visits[index];
    })

    setValues2(valuesNew);

  }, [marks2]);*/

  if (!marks || !marks.pupils || !marks.dates || !marks.mark_type_choices) {
    return <h3>Оценок пока нет</h3>;
  }

  return (
    <>
      {/*{marks2 && marks2.pupils && marks2.pupils.length !== 0 &&
        <section className={style.marksSection}>
          <section className={style.columnForTextData}>
            {marks2.pupils.map((pupil) => (
              <h3 key={pupil.id}>{pupil.name}</h3>
            ))}
            <h3>Посещения</h3>
          </section>

          <section>
            <section className={style.datesSection}>
              {marks2.dates.map((date, index) => (
                <div key={index} className={style.column}>
                  <h3>{date}</h3>

                  <div className={style.markTypes}>
                    {marks2.mark_type_choices.map((mark_type, index2) => (
                      <p key={index2}>{mark_type}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <div style={{
              marginTop: '2rem',
            }}>
              <Form
                buttonText='Сохранить оценки'
                inputs={inputs2}
                values={values2}
                type='saveTeacherMarks2'
                id={courseId}
              />
            </div>
          </section>

          <section className={style.columnForTextData} style={{
            margin: '2rem',
            alignItems: 'flex-start',
          }}>
            <h3>Итог</h3>
            {marks2.pupils.map((pupil) => (
              <h3 key={pupil.id}>{pupil.result}</h3>
            ))}
          </section>
        </section>
      }*/}
      <section className={style.marksSection}>
        <section className={style.columnForTextData}>
          {marks.pupils.map((pupil) => (
            <h3 key={pupil.id}>{pupil.name}</h3>
          ))}
          <h3>Посещения</h3>
        </section>

        <section>
          <section className={style.datesSection}>
            {marks.dates.map((date, index) => (
              <div key={index} className={style.column}>
                <h3>{date}</h3>

                <div className={style.markTypes}>
                  {marks.mark_type_choices.map((mark_type, index2) => (
                    <p key={index2}>{mark_type}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <div style={{
            marginTop: '2rem',
          }}>
            <Form
              buttonText='Сохранить оценки'
              inputs={inputs}
              values={values}
              type='saveTeacherMarks'
              id={courseId}
            />
          </div>
        </section>

        <section className={style.columnForTextData} style={{
          margin: '2rem',
          alignItems: 'flex-start',
        }}>
          <h3>Итог</h3>
          {marks.pupils.map((pupil) => (
            <h3 key={pupil.id}>{pupil.result}</h3>
          ))}
        </section>
      </section>
  </>
  );
};

export default TeacherMarks;