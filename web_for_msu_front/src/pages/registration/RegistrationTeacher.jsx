import style from './registration.module.css'
import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_PUPIL_ROUTE} from "../../routing/consts.js";

const RegistrationTeacher = () => {
  return (
    <div className={style.registration}>
      <h1>Регистрация Преподавателя</h1>

      <Form inputs={['email', 'password']} buttonText='Зарегистрироваться' type='login'/>

      <div className={loginStyle.links}>
        <Link to={REGISTRATION_PUPIL_ROUTE}>
          <p>Зарегистрироваться Ученику</p>
        </Link>
        <p>/</p>
        <Link to={LOGIN_ROUTE}>
          <p>Вернуться на страницу входа</p>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationTeacher;