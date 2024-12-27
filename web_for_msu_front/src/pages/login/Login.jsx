import style from './login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {REGISTRATION_PUPIL_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setAuthFromToken, setNotAuthAction} from "../../store/UserReducers.js";

const Login = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setAuthFromToken(token));
    } else {
      dispatch(setNotAuthAction());
    }
  }, [dispatch]);

  return (
    <article>
      <h1>Вход в личный аккаунт</h1>

      <div className={style.form}>
        <Form inputs={['email', 'password']} buttonText='Войти' type='login' dispatch={dispatch}/>
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
    </article>
  );
};

export default Login;