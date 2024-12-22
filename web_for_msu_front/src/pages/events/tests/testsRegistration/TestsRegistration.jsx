import Form from "../../../../generic/form/Form.jsx";

const TestsRegistration = () => {
  return (
    <Form inputs={[
      'name', 'surname', 'lastname', 'email', 'phone', 'classOver', 'format', 'city', 'agreementAb',
    ]}
          buttonText='Зарегистрироваться на вступительные'
          type='testsRegistration'
    />
  );
};

export default TestsRegistration;