import InputText from "../../../generic/form/inputs/userInputs/InputText.jsx";

// eslint-disable-next-line react/prop-types
const NewsSearch = ({newsSearch, setNewsSearch}) => {

  return (
    <sectrion style={{
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem 0',
    }}>
      <h2>Поиск новостей</h2>
      <InputText name='search news' value={newsSearch} setInput={setNewsSearch} placeholder='Найти новость'/>
    </sectrion>
  );
};

export default NewsSearch;