import Form from "../../../generic/form/Form.jsx";

const ChangeCourse = () => {
  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}>
      <div>
        <h2>Для изменения курса загрузите новый файл в форму ниже</h2>
      </div>

      <div style={{
        width: '100%',
      }}
      >
        <Form inputs={['courseFile']} buttonText='Изменить курс' type='courseChange'></Form>
      </div>
    </section>
  );
};

export default ChangeCourse;