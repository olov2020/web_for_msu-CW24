import style from './login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {REGISTRATION_PUPIL_ROUTE} from "../../routing/consts.js";

const Login = () => {

  return (
    <div className={style.login}>
      <h1>Вход в личный аккаунт</h1>
      <Form inputs={['email', 'password']} buttonText='Войти' type='login'/>
      <Link to={REGISTRATION_PUPIL_ROUTE}>
        <p>Зарегистрироваться</p>
      </Link>
    </div>
  );
};

export default Login;