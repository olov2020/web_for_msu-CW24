import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {useNavigate} from "react-router-dom";
import {closeRegistrationCourses, openRegistrationCourses, openRegistrationTests} from "../../api/adminApi.js";
import {ADMIN_MARKS_ROUTE} from "../../routing/consts.js";

const AdminPanel = () => {

  const navigate = useNavigate();

  const openRegistration = async () => {
    const data = await openRegistrationTests();
    if (data) {
      alert('Регистрация на вступительные открыта!');
    } else {
      alert('Что-то пошло не так... Регистрация не открыта');
    }
  }

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

  return (
    <article>
      <h1>Панель администратора</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        gap: '2rem 0',
      }}>
        <ButtonSubmit text='Открыть регистрацию на встпупительные' onClick={openRegistration}/>

        <div style={{
          display: 'flex',
          gap: '0 1rem',
        }}>
          <ButtonSubmit text='Открыть запись на курсы' onClick={openCourseRegistration}/>
          <ButtonSubmit text='Закрыть запись на курсы' onClick={closeCourseRegistration}
                        type='delete'
          />
        </div>
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
        <ButtonSubmit text='Список всех абитуриентов' onClick={() => navigate('/admin/list/applicants')}/>
        <ButtonSubmit text='Список всех учеников' onClick={() => navigate('/admin/list/pupils')}/>
        <ButtonSubmit text='Список всех преподавателей' onClick={() => navigate('/admin/list/teachers')}/>
        <ButtonSubmit text='Список всех ведомостей' onClick={() => navigate(ADMIN_MARKS_ROUTE)}/>
      </section>
    </article>
  );
};

export default AdminPanel;