import style from './login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {FORGET_PASSWORD_ROUTE, REGISTRATION_PUPIL_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";

const Login = () => {

  return (
    <article>
      <h1>Вход в личный аккаунт</h1>

      <div className={style.form}>
        <Form inputs={['email', 'password']} buttonText='Войти' type='login'/>
      </div>

      <div className={style.links}>
        <p>Зарегистрироваться</p>
        <Link to={REGISTRATION_PUPIL_ROUTE}>
          <p>Ученику</p>
        </Link>
        <p>/</p>
        <Link to={REGISTRATION_TEACHER_ROUTE}>
          <p>Преподавателю</p>
        </Link>
      </div>

      <div className={style.links}>
        <Link to={FORGET_PASSWORD_ROUTE}>
          <p>Забыли пароль?</p>
        </Link>
      </div>
    </article>
);
};

export default Login;