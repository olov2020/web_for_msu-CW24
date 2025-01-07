import style from './account.module.css'
import {useSelector} from "react-redux";
import Form from "../../generic/form/Form.jsx";

const Account = () => {

  const authStatus = useSelector(state => state.user.authStatus);

  return (
    <article className={style.account}>
      <h1>Данные пользователя</h1>

      <section>
        {authStatus.includes('pupil') ?
          <Form inputs={['photo', 'email', 'phone', 'school']}

                buttonText='Обновить данные' type='pupilChangeData'/> :
          <Form inputs={['photo', 'email', 'phone', 'university', 'work']}

                buttonText='Обновить данные' type='teacherChangeData'/>
        }
      </section>
    </article>
  );
};

export default Account;