import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {useNavigate} from "react-router-dom";
import {closeRegistrationCourses, openRegistrationCourses} from "../../api/adminApi.js";
import {HOME_ROUTE, MARKS_ROUTE} from "../../routing/consts.js";
import {useDispatch} from "react-redux";
import {setNotAuthAction} from "../../store/UserReducers.js";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      dispatch(setNotAuthAction());
      navigate(HOME_ROUTE);
      return true;
    } catch (error) {
      alert(`Выход из аккаунта не выполнен, повторите попытку позже.\nОшибка: ${error}`)
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
        <ButtonSubmit text='Список всех ведомостей' onClick={() => navigate(MARKS_ROUTE)}/>

        <div>
          <ButtonSubmit text='Выйти из аккаунта' onClick={userLogout} type='delete'/>
        </div>
      </section>
    </article>
  );
};

export default AdminPanel;