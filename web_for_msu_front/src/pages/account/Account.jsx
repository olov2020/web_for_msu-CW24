import style from './account.module.css'
import {useDispatch, useSelector} from "react-redux";
import Form from "../../generic/form/Form.jsx";
import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../routing/consts.js";
import {setNotAuthAction} from "../../store/UserReducers.js";

const Account = () => {

  const user = useSelector(state => state.user);
  console.log(user);

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
      console.log(error);
    }
  }

  return (
    <section className={style.account}>
      <div>
        <Form inputs={['photo']}
              buttonText='Сменить фото' type='userChangePhoto'/>
      </div>

      <div>
        <h1 style={{
          marginBottom: '2rem',
        }}
        >
          Данные пользователя
        </h1>

        {user.authStatus.includes('pupil') ?
          <Form inputs={['name', 'surname', 'lastname', 'email', 'phone', 'school']}

                buttonText='Обновить данные' type='pupilChangeData'/> :
          <Form inputs={['name', 'surname', 'lastname', 'email', 'phone', 'university', 'work']}

                buttonText='Обновить данные' type='teacherChangeData'/>
        }
      </div>

      <div>
        <h1 style={{
          marginBottom: '2rem',
        }}
        >
          Достижения
        </h1>


        <div>
          <ButtonSubmit text='Выйти из аккаунта' onClick={userLogout} type='delete'/>
        </div>
      </div>
    </section>
  );
};

export default Account;