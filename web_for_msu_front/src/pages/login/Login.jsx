import style from './login.module.css'
import styleApp from '../../app.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {REGISTRATION_PUPIL_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";

const Login = () => {

  return (
    <div className={styleApp.pageSection}>
      <h1 className={styleApp.pageTitle}>Вход в личный аккаунт</h1>

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
    </div>
  );
};

export default Login;