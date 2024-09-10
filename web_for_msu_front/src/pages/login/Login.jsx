import style from './login.module.css'
import Form from "../../generic/form/Form.jsx";

const Login = () => {

  return (
    <div className={style.login}>
      <Form inputs={['email', 'password']}/>
    </div>
  );
};

export default Login;