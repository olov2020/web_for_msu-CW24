import {useLocation} from "react-router-dom";
import deleteIcon from '../../../../public/generic/deleteIcon.svg'
import DeleteWindow from "./deleteWindow/DeleteWindow.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import axios from "axios";

const NewsItem = () => {

  const {state} = useLocation();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const authStatus = useSelector(state => state.user.authStatus);

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob', // Important to set the response type to 'blob'
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: response.data.type });

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName; // Set the desired file name

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Programmatically click the anchor to trigger the download
      link.click();

      // Remove the anchor from the document body
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(link.href);
      alert('Файл успешно скачан!');
    } catch {
      alert('Упс... что-то пошло не так. Файл не был скачан!');
    }
  };

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
          width: 'auto',
        }}>
          <p>У этой новости есть вложенный файл, вы можете его скачать ниже.</p>
        <ButtonSubmit onClick={() => handleFileDownload(state.file, state.title)} text='Скачать файл'/>
        </section>
      }
    </article>
  );
};

export default NewsItem;