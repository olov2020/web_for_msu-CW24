import Form from "../../generic/form/Form.jsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const ResetPassword = () => {

  const {pathname} = useLocation();

  const [accessToken, setAccessToken] = useState(undefined);

  useEffect(() => {
    setAccessToken(pathname.split("/")[pathname.length - 2]);
  }, [pathname]);

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

        <Form inputs={['password']} type='resetPassword' buttonText='Обновить пароль' id={accessToken}/>
      </section>
    </article>
  );
};

export default ResetPassword;