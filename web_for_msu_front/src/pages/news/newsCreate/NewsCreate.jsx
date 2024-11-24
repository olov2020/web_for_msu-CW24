import Form from "../../../generic/form/Form.jsx";


const NewsCreate = () => {
  return (
    <article>
      <h1>Добавление новости</h1>

      <div style={{
        width: '90%'
      }}
      >
        <Form
          inputs={['newsPhoto', 'newsTitle', 'newsDescription']}
          buttonText='Добавить новость'
          type='newsAdd'
        />
      </div>
    </article>
  );
};

export default NewsCreate;