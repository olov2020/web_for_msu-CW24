import style from './registration.module.css'
import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";

const RegistrationPupil = () => {
  return (
    <div className={style.registration}>
      <h1>Регистрация Ученика</h1>

      <Form inputs={['photo', 'name', 'surname', 'lastname', 'birthDate', 'email', 'password', 'phone']} buttonText='Зарегистрироваться' type='login'/>

      <div className={loginStyle.links}>
        <Link to={REGISTRATION_TEACHER_ROUTE}>
          <p>Зарегистрироваться Преподавателю</p>
        </Link>
        <p>/</p>
        <Link to={LOGIN_ROUTE}>
          <p>Вернуться на страницу входа</p>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPupil;