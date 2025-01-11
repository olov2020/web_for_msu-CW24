import style from './account.module.css'
import {useSelector} from "react-redux";
import Form from "../../generic/form/Form.jsx";
import {useEffect, useState} from "react";
import {getUserData} from "../../api/userApi.js";

const Account = () => {

  const authStatus = useSelector(state => state.user.authStatus);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDataFunc = async () => {
      const data = await getUserData();
      setUser(data);
    }

    getUserDataFunc();
  }, []);

  return (
    <article className={style.account}>
      <h1>Данные пользователя</h1>

      <section>
        {authStatus.includes('pupil') ?
          <Form inputs={['photo', 'email', 'phone', 'school']}
                values={[{'photo': user.photo}, {'email': user.email}, {'phone': user.phone} ,{'school': user.school}]}
                buttonText='Обновить данные' type='pupilChangeData'/> :
          <Form inputs={['photo', 'email', 'phone', 'university', 'work']}
                values={[{'photo': user.photo}, {'email': user.email}, {'university': user.university} ,{'work': user.work}]}
                buttonText='Обновить данные' type='teacherChangeData'/>
        }
      </section>
    </article>
  );
};

export default Account;