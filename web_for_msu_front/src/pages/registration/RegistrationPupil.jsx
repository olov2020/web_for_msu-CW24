import style from './registration.module.css'
import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";

const RegistrationPupil = () => {
  return (
    <div className={style.registration}>
      <h1>Регистрация Ученика</h1>

      <Form inputs={
        ['photo', 'name', 'surname', 'lastname',
          'birthDate', 'email', 'password', 'phone',
          'school', 'school_end_date', 'registration_address',
          'telegram', 'vk',
          'parent1_name', 'parent1_surname', 'parent1_lastname', 'parent1_phone', 'parent1_email',
          'parent2_name', 'parent2_surname', 'parent2_lastname', 'parent2_phone', 'parent2_email',
          'agreement', 'how_to_know', 'mailing',
        ]
      }
            buttonText='Зарегистрироваться' type='pupil_registration'/>

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