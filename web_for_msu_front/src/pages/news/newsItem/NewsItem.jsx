import {useLocation, useNavigate} from "react-router-dom";
import deleteIcon from '../../../../public/generic/deleteIcon.svg'
import DeleteWindow from "./deleteWindow/DeleteWindow.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import {NEWS_ROUTE} from "../../../routing/consts.js";

const NewsItem = () => {

  const {state} = useLocation();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const authStatus = useSelector(state => state.user.authStatus);
  const navigate = useNavigate();

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName; // Set the desired file name

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Programmatically click the anchor to trigger the download
      link.click();

      // Remove the anchor from the document body
      document.body.removeChild(link);
      alert('Файл успешно скачан!');
    } catch {
      alert('Упс... что-то пошло не так. Файл не был скачан!');
    }
  };

  if (!state.id) {
    navigate(NEWS_ROUTE);
    return;
  }

  return (
    <article key={state.id}>
      <h1>{state.title}</h1>

      <section
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          width: '90%',
          gap: '1rem',
        }}
      >
        <h3>
          {state.date}
        </h3>

        {(authStatus.includes('admin') || authStatus.includes('newsmaker')) &&
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          >
            <img src={deleteIcon} alt='Удалить новость'
                 style={{
                   width: '2rem',
                   objectFit: 'contain',
                 }}
                 onClick={() => {
                   setShowDeleteWindow(!showDeleteWindow)
                 }}
            />
            {showDeleteWindow && <DeleteWindow setShowDeleteWindow={setShowDeleteWindow} newsId={state.id}/>}
          </div>
        }
      </section>

      {state.photo &&
        <img src={state.photo} alt={state.title}
             style={{
               width: "30vw",
               objectFit: 'contain',
             }}
        />
      }

      <p style={{
        margin: '0 2rem',
        width: '80%',
      }}
      >
        {state.description}
      </p>

      {state.file &&
        <section style={{
          width: '90%',
        }}>
          <p>У этой новости есть вложенный файл, вы можете его скачать ниже.</p>
          <div style={{
            width: 'auto',
          }}>
        <ButtonSubmit onClick={() => handleFileDownload(state.file, state.title)} text='Скачать файл'/>
          </div>
        </section>
      }
    </article>
  );
};

export default NewsItem;