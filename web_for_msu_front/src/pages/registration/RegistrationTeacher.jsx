import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_PUPIL_ROUTE} from "../../routing/consts.js";
import styleApp from "../../app.module.css";

const RegistrationTeacher = () => {
  return (
    <div className={styleApp.pageSection}>
      <h1 className={styleApp.pageTitle}>Регистрация Преподавателя</h1>

      <div className={loginStyle.form}>
        <Form inputs={
          ['photo', 'name', 'surname', 'lastname',
            'birthDate', 'email', 'password', 'phone',
            'school', 'school_end_date', 'university', 'university_end_date',
            'work',
            'registration_address',
            'telegram', 'vk',
            'was_pupil',
          ]
        }
              buttonText='Зарегистрироваться' type='teacher_registration'/>
      </div>

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