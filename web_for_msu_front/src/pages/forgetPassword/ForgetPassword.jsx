import Form from "../../generic/form/Form.jsx";

const ForgetPassword = () => {

  return (
    <article>
      <h1>Забыли пароль?</h1>

      <section style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3>Чтобы сбросить пароль, введите почту, на которую зарегистрирован аккаунт. Вам придет письмо со ссылкой на
          сброс пароля.</h3>

        <Form inputs={['forgetPassword']} type='forgetPassword' buttonText='Сбросить пароль'/>
      </section>
    </article>
  );
};

export default ForgetPassword;