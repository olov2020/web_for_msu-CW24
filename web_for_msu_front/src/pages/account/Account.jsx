import style from './account.module.css'
import styleApp from '../../app.module.css'
import {useSelector} from "react-redux";
import {getUserInfoByUserId} from "../../api/userApi.js";
import Form from "../../generic/form/Form.jsx";

const Account = () => {

  const user = useSelector(state => state.user);
  // const userInfo = getUserInfoByUserId(user.id);

  // FOR TEST
  const userInfo = {
    name: 'Vladimir',
    surname: 'Vinogradov',
    lastname: 'Andreevich',
    email: 'vavinogradov@edu.hse.ru',
    phone: '+79855800882',
    school: 'Лицей НИУ ВШЭ',
  }

  // TODO
  // add check for equals

  return (
    <div className={style.account}>
      <div>
        <Form inputs={['photo']} values={userInfo}
              buttonText='Сменить фото' type='userChangePhoto'/>
      </div>

      <div>
        <h1 className={styleApp.pageTitle}>Данные пользователя</h1>

        <Form inputs={['name', 'surname', 'lastname', 'email', 'password', 'newPassword', 'phone', 'school']}
              values={userInfo}
              buttonText='Обновить данные' type='userChangeData'/>
      </div>

      <div>
        <h1 className={styleApp.pageTitle}>Достижения</h1>
      </div>
    </div>
  );
};

export default Account;