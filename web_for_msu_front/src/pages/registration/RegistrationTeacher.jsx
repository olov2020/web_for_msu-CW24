import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_PUPIL_ROUTE} from "../../routing/consts.js";

const RegistrationTeacher = () => {
  return (
    <article>
      <h1>Регистрация Преподавателя</h1>

      <div className={loginStyle.form}>
        <Form inputs={
          ['photo', 'name', 'surname', 'lastname',
            'birthDate', 'email', 'password', 'phone',
            'school', 'schoolEndDate', 'university', 'universityEndDate',
            'work',
            'registrationAddress',
            'telegram', 'vk',
            'agreement', 'wasPupil',
          ]
        }
              buttonText='Зарегистрироваться' type='teacherRegistration'/>
      </div>

      <div className={loginStyle.links}>
        <Link to={REGISTRATION_PUPIL_ROUTE}>
          <p>Зарегистрироваться Ученику</p>
        </Link>
        <Link to={LOGIN_ROUTE}>
          <p>Вернуться на страницу входа</p>
        </Link>
      </div>
    </article>
  );
};

export default RegistrationTeacher;