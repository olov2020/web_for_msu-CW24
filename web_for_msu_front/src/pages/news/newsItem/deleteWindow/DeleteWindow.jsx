import ButtonSubmit from "../../../../generic/form/submit/ButtonSubmit.jsx";
import {deleteNewsItem} from "../../../../api/newsApi.js";
import {useNavigate} from "react-router-dom";
import {NEWS_ROUTE} from "../../../../routing/consts.js";

// eslint-disable-next-line react/prop-types
const DeleteWindow = ({setShowDeleteWindow, newsId}) => {

  const hideDeleteWindow = () => {
    setShowDeleteWindow(false);
  }

  const navigate = useNavigate();

  const deleteItem = async () => {
    const responseStatus = await deleteNewsItem({newsId});
    if (responseStatus) {
      alert('Новость успешно удалена');
      navigate(NEWS_ROUTE);
    } else {
      alert('Ошибка удаления');
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      marginTop: '3rem',
      marginLeft: '-15rem',
      width: '20rem',
      padding: '1rem',
      gap: '2rem 0',
      border: '1px dotted gray',
    }}
    >
      <h3>Вы уверены, что хотите удалить новость?</h3>

      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: '0 1rem',
        }}
      >
        <ButtonSubmit text='Нет' onClick={hideDeleteWindow} type='delete'/>
        <ButtonSubmit text='Да' onClick={deleteItem}/>
      </div>
    </div>
  );
};

export default DeleteWindow;