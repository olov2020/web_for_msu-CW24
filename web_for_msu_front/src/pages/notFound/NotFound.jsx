import ButtonSubmit from "../../generic/form/submit/ButtonSubmit.jsx";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../routing/consts.js";


const NotFound = () => {

  const navigate = useNavigate();

  return (
    <article>
      <h1 style={{
        fontSize: '3rem',
        textAlign: 'center',
      }}>Ошибка 404, страница не найдена</h1>

      <div>
      <ButtonSubmit text='Вернуться на главную страницу' onClick={() => navigate(HOME_ROUTE)}/>
      </div>
    </article>
  );
};

export default NotFound;