import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";
import styleApp from "../../app.module.css";

const RegistrationPupil = () => {
  return (
    <div className={styleApp.pageSection}>
      <h1 className={styleApp.pageTitle}>Регистрация Ученика</h1>

      <div className={loginStyle.form}>
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
      </div>

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