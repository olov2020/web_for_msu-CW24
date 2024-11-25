import style from './account.module.css'
import {useSelector} from "react-redux";
import {getUserInfoByUserId} from "../../api/userApi.js";
import Form from "../../generic/form/Form.jsx";
import {useEffect, useState} from "react";

const Account = () => {

  const user = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const info = await getUserInfoByUserId(user.id);
      setUserInfo(info);
      console.log(userInfo);
    }

    getUserInfo();
  }, []);

  // FOR TEST
  /*const userInfo = {
    name: 'Vladimir',
    surname: 'Vinogradov',
    lastname: 'Andreevich',
    email: 'vavinogradov@edu.hse.ru',
    phone: '+79855800882',
    school: 'Лицей НИУ ВШЭ',
    university: 'НИУ ВШЭ',
    work: 'Сбер',
    authStatus: 'teacher',
  }*/

  return (
    <section className={style.account}>
      <div>
        <Form inputs={['photo']} values={userInfo}
              buttonText='Сменить фото' type='userChangePhoto'/>
      </div>

      <div>
        <h1 style={{
          marginBottom: '2rem',
        }}
        >
          Данные пользователя
        </h1>

        {userInfo.authStatus === 'pupil' ?
          <Form inputs={['name', 'surname', 'lastname', 'email', 'phone', 'school']}
                values={userInfo}
                buttonText='Обновить данные' type='pupilChangeData'/> :
          <Form inputs={['name', 'surname', 'lastname', 'email', 'phone', 'university', 'work']}
                values={userInfo}
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
      </div>
    </section>
  );
};

export default Account;