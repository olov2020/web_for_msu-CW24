import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {useNavigate} from "react-router-dom";
import {
  closeRegistrationCourses, downloadAllMarks,
  downloadAllPupils,
  downloadAllTeachers,
  openRegistrationCourses
} from "../../api/adminApi.js";
import {ADD_NEW_COURSE_ROUTE, AUDITORY_ROUTE, CREATE_NEWS_ROUTE, MARKS_ROUTE} from "../../routing/consts.js";

const AdminPanel = () => {

  const openCourseRegistration = async () => {
    const data = await openRegistrationCourses();
    if (data) {
      alert('Запись на курсы открыта!');
    } else {
      alert('Что-то пошло не так... Запись не открыта');
    }
  }

  const closeCourseRegistration = async () => {
    const data = await closeRegistrationCourses();
    if (data) {
      alert('Запись на курсы закрыта!');
    } else {
      alert('Что-то пошло не так... Запись не закрыта');
    }
  }

  const navigate = useNavigate();

  const downloadAllPupilsFunc = async () => {
    const data = await downloadAllPupils();
    if (data) {
      alert('Файл успешно сохранен');
    } else {
      alert('Что-то пошло не так... Файл не был сохранен');
    }
  }

  const downloadAllTeachersFunc = async () => {
    const data = await downloadAllTeachers();
    if (data) {
      alert('Файл успешно сохранен');
    } else {
      alert('Что-то пошло не так... Файл не был сохранен');
    }
  }

  const downloadAllMarksFunc = async () => {
    const data = await downloadAllMarks();
    if (data) {
      alert('Файл успешно сохранен');
    } else {
      alert('Что-то пошло не так... Файл не был сохранен');
    }
  }

  return (
    <article>
      <h1>Панель администратора</h1>

      <section style={{
        display: 'flex',
        width: '30%',
        gap: '0 1rem',
      }}>
        <ButtonSubmit text='Открыть запись на курсы' onClick={openCourseRegistration}/>
        <ButtonSubmit text='Закрыть запись на курсы' onClick={closeCourseRegistration}
                      type='delete'
        />
      </section>

      <h1 style={{
        marginTop: '5rem',
      }}>Списки</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        gap: '1rem 0',
      }}>
        <ButtonSubmit text='Список всех учеников' onClick={() => navigate('/admin/list/pupils')}/>
        <ButtonSubmit text='Список всех преподавателей' onClick={() => navigate('/admin/list/teachers')}/>
      </section>

      <h1 style={{
        marginTop: '5rem',
      }}>Дополнительный функционал</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        gap: '1rem 0',
      }}>
        <ButtonSubmit text='Добавить новый курс' onClick={() => navigate(ADD_NEW_COURSE_ROUTE)}/>
        <ButtonSubmit text='Создать новость' onClick={() => navigate(CREATE_NEWS_ROUTE)}/>
        <ButtonSubmit text='Список всех ведомостей' onClick={() => navigate(MARKS_ROUTE)}/>
        <ButtonSubmit text='Назначение аудиторий' onClick={() => navigate(AUDITORY_ROUTE)}/>
      </section>

      <h1 style={{
        marginTop: '5rem',
      }}>Выгрузка базы данных</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        gap: '1rem 0',
      }}>
        <ButtonSubmit text='Все ученики' onClick={downloadAllPupilsFunc}/>
        <ButtonSubmit text='Все преподаватели' onClick={downloadAllTeachersFunc}/>
        <ButtonSubmit text='Все ведомости курсов' onClick={downloadAllMarksFunc}/>
      </section>
    </article>
  );
};

export default AdminPanel;