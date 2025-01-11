import Form from "../../../generic/form/Form.jsx";

// eslint-disable-next-line react/prop-types
const ChangeCourse = ({courseId}) => {
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
        <Form inputs={['courseFile']} buttonText='Изменить курс' type='courseChange' id={courseId}/>
      </div>
    </section>
  );
};

export default ChangeCourse;