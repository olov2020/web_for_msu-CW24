import loginStyle from '../login/login.module.css'
import Form from "../../generic/form/Form.jsx";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../../routing/consts.js";

const RegistrationPupil = () => {
  return (
    <article>
      <h1>Регистрация Ученика</h1>

      <div className={loginStyle.form}>
        <Form inputs={
          ['photo', 'name', 'surname', 'lastname',
            'birthDate', 'email', 'password', 'phone',
            'school', 'schoolClass', 'registrationAddress',
            'telegram', 'vk',
            'parent1Name', 'parent1Surname', 'parent1Lastname', 'parent1Phone', 'parent1Email',
            'parent2Name', 'parent2Surname', 'parent2Lastname', 'parent2Phone', 'parent2Email',
            'agreement', 'howToKnow', 'mailing',
          ]
        }
              buttonText='Зарегистрироваться' type='pupilRegistration'/>
      </div>

      <div className={loginStyle.links}>
        <Link to={REGISTRATION_TEACHER_ROUTE}>
          <p>Зарегистрироваться Преподавателю</p>
        </Link>
        <Link to={LOGIN_ROUTE}>
          <p>Вернуться на страницу входа</p>
        </Link>
      </div>
    </article>
  );
};

export default RegistrationPupil;