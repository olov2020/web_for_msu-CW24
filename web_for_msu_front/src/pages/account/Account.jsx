import style from './account.module.css'
import {useSelector} from "react-redux";
import Form from "../../generic/form/Form.jsx";
import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {userLogout} from "../../api/userApi.js";

const Account = () => {

  const user = useSelector(state => state.user);
  console.log(user);

  return (
    <section className={style.account}>
      <div>
        <Form inputs={['photo']} values={[user.name, user.surname, user.lastname, user.email]}
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
                values={[user.name, user.surname, user.lastname, user.email]}
                buttonText='Обновить данные' type='pupilChangeData'/> :
          <Form inputs={['name', 'surname', 'lastname', 'email', 'phone', 'university', 'work']}
                values={[user.name, user.surname, user.lastname, user.email]}
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