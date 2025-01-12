import style from './account.module.css'
import {useDispatch, useSelector} from "react-redux";
import Form from "../../generic/form/Form.jsx";
import {useEffect, useState} from "react";
import {getPupilInfo, getTeacherInfo} from "../../api/userApi.js";

const Account = () => {

  const authStatus = useSelector(state => state.user.authStatus);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDataFunc = async () => {
      const data = authStatus.includes('pupil') ? await getPupilInfo() : await getTeacherInfo();
      setUser(data);
    }

    getUserDataFunc();
  }, [dispatch, user]);

  console.log(user);

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