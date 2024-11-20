import Form from "../../../generic/form/Form.jsx";


const NewsCreate = () => {
  return (
    <section>
      <Form
            inputs={['newsPhoto', 'newsTitle', 'newsDescription']}
            buttonText='Добавить новость'
            type='newsAdd'
      />
    </section>
  );
};

export default NewsCreate;