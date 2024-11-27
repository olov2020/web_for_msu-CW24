import Form from "../../../generic/form/Form.jsx";

const AddNewCourse = () => {

  return (
    <article>
      <h1>Добавить новый курс</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        gap: '5rem 0',
      }}
      >
        <Form inputs={['courseFile']} buttonText='Создать новый курс' type='courseAdd'></Form>
      </div>
    </article>
  );
};

export default AddNewCourse;