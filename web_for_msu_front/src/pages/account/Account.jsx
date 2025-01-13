import style from './account.module.css'
import {useSelector} from "react-redux";
import Form from "../../generic/form/Form.jsx";
import {useEffect, useState} from "react";
import {getPupilInfo, getTeacherInfo} from "../../api/userApi.js";
import {useLocation} from "react-router-dom";

const Account = () => {

  const authStatus = useSelector(state => state.user.authStatus);
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    const getUserDataFunc = async () => {
      const data = authStatus.includes('teacher') ? await getTeacherInfo() : await getPupilInfo();
      setUser(data);
    }

    getUserDataFunc();
  }, [location.pathname]);

  console.log(user)

  return (
    <article className={style.account}>
      <h1>Данные пользователя</h1>

      <section>
        {authStatus.includes('pupil') ?
          <Form inputs={['photo', 'email', 'phone', 'school']}
                values={user}
                buttonText='Обновить данные' type='pupilChangeData'/> :
          <Form inputs={['photo', 'email', 'phone', 'university', 'work']}
                values={user}
                buttonText='Обновить данные' type='teacherChangeData'/>
        }
      </section>
    </article>
  );
};

export default Account;