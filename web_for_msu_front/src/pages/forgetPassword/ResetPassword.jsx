import Form from "../../generic/form/Form.jsx";
import {useLocation} from "react-router-dom";

const ResetPassword = () => {

  const {pathname} = useLocation();
  const accessToken = pathname.split("/")[pathname.length - 2];
  localStorage.setItem("accessToken", accessToken);

  return (
    <article>
      <h1>Страница сброса пароля</h1>

      <section style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3>Придумайте новый пароль и введите его в поле ниже.</h3>

        <Form inputs={['password']} type='resetPassword' buttonText='Обновить пароль'/>
      </section>
    </article>
  );
};

export default ResetPassword;