import {useEffect, useState} from 'react';
import {getTeacherMarksByCourseId, getTeacherMarksByCourseId2} from "../../../api/coursesApi.js";
import style from './teacherMarks.module.css';
import Form from "../../../generic/form/Form.jsx";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
const TeacherMarks = ({courseId}) => {

  const [marks, setMarks] = useState({
    dates: [],
    mark_type_choices: [],
    pupils: [],
    visits: [],
  });
  const {pathname} = useLocation();
  const authStatus = useSelector((state) => state.user.authStatus);

  const [marks2, setMarks2] = useState({
    dates: [],
    mark_type_choices: [],
    pupils: [],
    visits: [],
  });

  useEffect(() => {
    const getMarks = async () => {
      const data = await getTeacherMarksByCourseId({courseId});
      setMarks(data);
    }

    getMarks();

    const getMarks2 = async () => {
      try {
        const data = await getTeacherMarksByCourseId2({courseId});
        setMarks2(data);
      } catch {
        setMarks2(null);
      }
    }

    getMarks2();
  }, [pathname, authStatus, courseId])

  const [inputs, setInputs] = useState({});
  const [values, setValues] = useState({});
  const [inputs2, setInputs2] = useState({});
  const [values2, setValues2] = useState({});
  const [inputsTeacherResult, setInputsTeacherResult] = useState([]);
  const [valuesTeacherResult, setValuesTeacherResult] = useState({});
  const [inputsTeacherResult2, setInputsTeacherResult2] = useState([]);
  const [valuesTeacherResult2, setValuesTeacherResult2] = useState({});

  useEffect(() => {
    const inputsNew = [];

    if (marks.dates.length > 0 && marks.pupils.length > 0 && marks.mark_type_choices.length > 0) {
      marks.dates.forEach((date) => {
        marks.pupils.forEach((pupil) => {
          marks.mark_type_choices.forEach((markType) => {
            inputsNew.push(`${pupil.id} ${date} ${markType}`);
          });
        });
      });

      marks.dates.forEach((date) => {
        inputsNew.push(`visits ${date}`);
      });

      const teacherResults = [];
      marks.pupils.forEach((pupil) => {
        teacherResults.push(`teacher_result ${pupil.id}`);
      });
      setInputsTeacherResult(teacherResults);

      const teacherResultsValues = teacherResults.reduce((acc, teacherResult) => {
        const pupilId = teacherResult.split(' ')[1];
        acc[teacherResult] = marks.pupils[pupilId].teacher_result;
        return acc;
      }, {});
      setValuesTeacherResult(teacherResultsValues);

      const inputsDict = inputsNew.reduce((acc, input) => {
        const [pupilId] = input.split(' ');
        if (!acc[pupilId]) {
          acc[pupilId] = [];
        }
        acc[pupilId].push(input);
        return acc;
      }, {});

      setInputs(inputsDict);
    }

    const valuesNew = {};

    if (marks.dates.length > 0 && marks.pupils.length > 0 && marks.mark_type_choices.length > 0) {
      marks.dates.forEach((date, index) => {
        marks.pupils.forEach((pupil) => {
          marks.mark_type_choices.forEach((markType, index2) => {
            if (pupil.marks[index] && pupil.marks[index][index2] !== undefined) {
              valuesNew[`${pupil.id} ${date} ${markType}`] = pupil.marks[index][index2];
            }
          });
        });
      });

      marks.dates.forEach((date, index) => {
        if (marks.visits[index] !== undefined) {
          valuesNew[`visits ${date}`] = marks.visits[index];
        }
      });
    }

    setValues(valuesNew);
  }, [marks]);


  useEffect(() => {
    const inputsNew = [];

    if (marks2.dates.length > 0 && marks2.pupils.length > 0 && marks2.mark_type_choices.length > 0) {
      marks2.dates.forEach((date) => {
        marks2.pupils.forEach((pupil) => {
          marks2.mark_type_choices.forEach((markType) => {
            inputsNew.push(`${pupil.id} ${date} ${markType}`);
          });
        });
      });

      marks2.dates.forEach((date) => {
        inputsNew.push(`visits ${date}`);
      });

      const teacherResults = [];
      marks2.pupils.forEach((pupil) => {
        teacherResults.push(`teacher_result ${pupil.id}`);
      });
      setInputsTeacherResult2(teacherResults);

      const teacherResultsValues = teacherResults.reduce((acc, teacherResult) => {
        const pupilId = teacherResult.split(' ')[1];
        acc[teacherResult] = marks2.pupils[pupilId].teacher_result;
        return acc;
      }, {});
      setValuesTeacherResult2(teacherResultsValues);

      const inputsDict = inputsNew.reduce((acc, input) => {
        const [pupilId] = input.split(' ');
        if (!acc[pupilId]) {
          acc[pupilId] = [];
        }
        acc[pupilId].push(input);
        return acc;
      }, {});

      setInputs2(inputsDict);
    }

    const valuesNew = {};

    if (marks2.dates.length > 0 && marks2.pupils.length > 0 && marks2.mark_type_choices.length > 0) {
      marks2.dates.forEach((date, index) => {
        marks2.pupils.forEach((pupil) => {
          marks2.mark_type_choices.forEach((markType, index2) => {
            if (pupil.marks[index] && pupil.marks[index][index2] !== undefined) {
              valuesNew[`${pupil.id} ${date} ${markType}`] = pupil.marks[index][index2];
            }
          });
        });
      });

      marks2.dates.forEach((date, index) => {
        if (marks2.visits[index] !== undefined) {
          valuesNew[`visits ${date}`] = marks2.visits[index];
        }
      });
    }

    setValues2(valuesNew);
  }, [marks2]);

  if (marks.pupils.length === 0) {
    return <h3>На курсе пока нет учеников</h3>;
  }

  return (
    <>
      {marks2 &&
        <section className={style.marksSection}>
          <section className={style.columnForTextData}>
            {marks2.pupils.length !== 0 && marks2.pupils.map((pupil) => (
              <h3 key={pupil.id}>{pupil.name}</h3>
            ))}
            <h3>Посещения</h3>
          </section>

          <section>
            <section className={style.datesSection}>
              {marks2.dates.length !== 0 && marks2.dates.map((date, index) => (
                <div key={index} className={style.column}>
                  <h3>{date}</h3>

                  <div className={style.markTypes}>
                    {marks2.mark_type_choices.length !== 0 && marks2.mark_type_choices.map((mark_type, index2) => (
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
            {marks2.pupils.length !== 0 && marks2.pupils.map((pupil) => (
              <h3 key={pupil.id}>{pupil.result}</h3>
            ))}
          </section>

          <section>
            <Form
              buttonText='Сохранить итог'
              inputs={inputsTeacherResult2}
              values={valuesTeacherResult2}
              type='saveTeacherResults2'
              id={courseId}
            />
          </section>
        </section>
      }

      <section className={style.marksSection}>
        <section className={style.columnForTextData}>
          {marks.pupils.length !== 0 && marks.pupils.map((pupil) => (
            <h3 key={pupil.id}>{pupil.name}</h3>
          ))}
          <h3>Посещения</h3>
        </section>

        <section>
          <section className={style.datesSection}>
            {marks.dates.length !== 0 && marks.dates.map((date, index) => (
              <div key={index} className={style.column}>
                <h3>{date}</h3>

                <div className={style.markTypes}>
                  {marks.mark_type_choices.length !== 0 && marks.mark_type_choices.map((mark_type, index2) => (
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
          {marks.pupils.length !== 0 && marks.pupils.map((pupil) => (
            <h3 key={pupil.id}>{pupil.result}</h3>
          ))}
        </section>

        <section>
          <Form
            buttonText='Сохранить итог'
            inputs={inputsTeacherResult}
            values={valuesTeacherResult}
            type='saveTeacherResults'
            id={courseId}
          />
        </section>
      </section>
    </>
  );
};

export default TeacherMarks;