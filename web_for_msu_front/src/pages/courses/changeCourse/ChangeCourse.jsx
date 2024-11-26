import Form from "../../../generic/form/Form.jsx";

const ChangeCourse = () => {
  return (
    <section>
      <h2>Изменить курс</h2>
      <p>Для изменения курса загрузите новый файл с данными в форму ниже</p>

      <div style={{
        width: '90%',
      }}
      >
        <Form inputs={['courseFile']} buttonText='Изменить курс' type='courseChange'></Form>
      </div>
    </section>
  );
};

export default ChangeCourse;