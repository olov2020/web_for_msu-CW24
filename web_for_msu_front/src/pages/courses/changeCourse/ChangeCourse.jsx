import Form from "../../../generic/form/Form.jsx";

const ChangeCourse = () => {
  return (
    <article>
      <h1>Изменить курс</h1>

      <div style={{
        width: '90%',
      }}
      >
        <Form inputs={['courseFile']} buttonText='Загрузить новый курс' type='courseAdd'></Form>
      </div>
    </article>
  );
};

export default ChangeCourse;