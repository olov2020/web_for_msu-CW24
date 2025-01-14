import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {useNavigate} from "react-router-dom";
import {
  closeRegistrationCourses, downloadDatabase,
  openRegistrationCourses
} from "../../api/adminApi.js";
import {ADD_NEW_COURSE_ROUTE, AUDITORY_ROUTE, CREATE_NEWS_ROUTE, MARKS_ROUTE} from "../../routing/consts.js";
import {useState} from "react";

const AdminPanel = () => {

  const [registrationStatus, setRegistrationStatus] = useState(false)

  const openCourseRegistration = async () => {
    const data = await openRegistrationCourses();
    if (data) {
      alert('Запись на курсы открыта!');
      setRegistrationStatus(!registrationStatus);
    } else {
      alert('Что-то пошло не так... Запись не открыта');
    }
  }

  const closeCourseRegistration = async () => {
    const data = await closeRegistrationCourses();
    if (data) {
      alert('Запись на курсы закрыта!');
      setRegistrationStatus(!registrationStatus);
    } else {
      alert('Что-то пошло не так... Запись не закрыта');
    }
  }

  const navigate = useNavigate();

  const downloadDatabaseFunc = async () => {
    try {
      const data = await downloadDatabase();
      const blob = new Blob([data], { type: data.type });

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `emsch_db_${new Date()}.xlsx`; // Set the desired file name and extension

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Programmatically click the anchor to trigger the download
      link.click();

      // Remove the anchor from the document body
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(link.href);
      alert('Файл успешно скачан!')
    } catch {
      alert('Упс... что-то пошло не так. Файл не был сохранен');
    }
  }

  return (
    <article>
      <h1>Панель администратора</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        gap: '0 1rem',
      }}>
        {registrationStatus ?
          <h3>Регистрация на вступительные <strong>открыта</strong></h3> :
          <h3>Регистрация на вступительные <strong>закрыта</strong></h3>
        }
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
        width: '90%',
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
        width: '90%',
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
        width: '90%',
        gap: '1rem 0',
      }}>
        <ButtonSubmit text='Сделать выгрузку' onClick={downloadDatabaseFunc}/>
      </section>
    </article>
  );
};

export default AdminPanel;