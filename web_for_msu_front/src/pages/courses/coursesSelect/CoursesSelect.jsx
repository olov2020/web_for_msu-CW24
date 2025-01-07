import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCoursesSelectStatus} from "../../../api/coursesApi.js";
import styleCourse from "../course.module.css";
import InputDropdown from "../../../generic/form/inputs/userInputs/InputDropdown.jsx";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import {$authHost} from "../../../api/axiosApi.js";


const CoursesSelect = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  const [selectCoursesStatus, setSelectCoursesStatus] = useState(true);
  const [courses, setCourses] = useState([
    {
      name: 'Приручение python\'а',
      id: 1,
      lesson_time: "Вторник 17:20 - 18:40",
      crediting: "зачётный для всех классов",
      direction: "Третий Путь",
      emsh_grades: "9 - 11",
      selected: 'Зачетный',
    },
    {
      name: 'Приручение python\'а',
      id: 1,
      lesson_time: "Вторник 17:20 - 18:40",
      crediting: "зачётный для всех классов",
      direction: "Третий Путь",
      emsh_grades: "9 - 11",
      selected: 'Незачетный',
    },
    {
      name: 'Приручение python\'а',
      id: 1,
      lesson_time: "Вторник 17:20 - 18:40",
      crediting: "зачётный для всех классов",
      direction: "Третий Путь",
      emsh_grades: "9 - 11",
      selected: false,
    },
  ]);

  const [coursesSelected, setCoursesSelected] = useState([
    'Зачетный',
    'Незачетный',
    'Не выбран',
  ]);

  const handleCourseChange = (value, index) => {
    const updatedCourses = [...coursesSelected]; // Create a copy
    updatedCourses[index] = value;       // Update the specific index
    setCoursesSelected(updatedCourses); // Update the state
  };

  useEffect(() => {
    const getCoursesSelectStatusFunc = async () => {
      const responseStatus = await getCoursesSelectStatus();
      setSelectCoursesStatus(responseStatus);
    }

    getCoursesSelectStatusFunc();
  }, []);

  if (!selectCoursesStatus) {
    return (
      <article>
        <h1>В данный момент выбор курсов не доступен</h1>
      </article>
    )
  }

  const submitCoursesSelection = async () => {
    const coursesCopy = [...courses];
    for (let i = 0; i < courses.length; ++i) {
      coursesCopy[i].selected = coursesSelected[i];
    }
    setCourses(coursesCopy);
    const response = await $authHost.post('/pupil/select_courses', courses);
    try {
      if (response.status === 200) {
        alert('Курсы успешно выбраны!');
      } else {
        alert('Курсы не были выбраны. Проверьте, что зачетных курсов выбрано ровно 2 и из разных направлений.');
      }
    } catch (error) {
      alert(`Возникла ошибка во время выбора курсов: ${error}`)
    }
  }

  return (
    <article>
      <h1>Выбор курсов</h1>

      {userStatus === 'pupil' ?
        <form style={{
          display: "flex",
          flexDirection: "column",
          width: '90%',
          gap: '1rem 0',
        }} method='POST' onSubmit={submitCoursesSelection}>
          {courses.map((course, index) => (
            <div key={course.id} className={styleCourse.courseCard}>
              <h3>{course.name}</h3>
              <p><span>{course.lesson_time}</span></p>
              <p>{course.direction}: {course.emsh_grades} - <span>{course.crediting}</span></p>

              <div style={{
                width: '15%',
              }}>
                <InputDropdown name={`course${course.id}`} placeholder='Зачетный / незачетный'
                               values={['Зачетный', 'Незачетный', 'Не выбран']}
                               value={coursesSelected[index]}
                               setValue={(value) => handleCourseChange(value, index)}
                />
              </div>
            </div>
          ))}

          <ButtonSubmit text='Сохранить выбор'/>
        </form> :
        <section>
          <h3>Вам не доступен выбор курсов</h3>
        </section>
      }
    </article>
  );
};

export default CoursesSelect;