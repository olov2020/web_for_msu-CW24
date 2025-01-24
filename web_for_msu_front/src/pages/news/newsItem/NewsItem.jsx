import {useLocation} from "react-router-dom";
import deleteIcon from '../../../../public/generic/deleteIcon.svg'
import DeleteWindow from "./deleteWindow/DeleteWindow.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import {getNewsById} from "../../../api/newsApi.js";

const NewsItem = () => {

  const {pathname, state} = useLocation();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const authStatus = useSelector(state => state.user.authStatus);
  const [newsInfo, setNewsInfo] = useState({});

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

  useEffect(() => {
    if (!state) {
      const pathnameArr = pathname.split("/");
      const newsId = Number(pathnameArr[pathnameArr.length - 1]);
      const getNewsByIdFunc = async () => {
        const data = await getNewsById({newsId});
        setNewsInfo(data);
      }

      getNewsByIdFunc();
    } else {
      setNewsInfo(state);
    }
  }, [state, pathname]);

  return (
    <article key={newsInfo.id}>
      <h1>{newsInfo.title}</h1>

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
          {newsInfo.date}
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
            {showDeleteWindow && <DeleteWindow setShowDeleteWindow={setShowDeleteWindow} newsId={newsInfo.id}/>}
          </div>
        }
      </section>

      {newsInfo.photo &&
        <img src={newsInfo.photo} alt={newsInfo.title}
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
        {newsInfo.description}
      </p>

      {newsInfo.file &&
        <section style={{
          width: '90%',
        }}>
          <p>У этой новости есть вложенный файл, вы можете его скачать ниже.</p>
          <div style={{
            width: 'auto',
          }}>
            <ButtonSubmit onClick={() => handleFileDownload(newsInfo.file, newsInfo.title)} text='Скачать файл'/>
          </div>
        </section>
      }
    </article>
  );
};

export default NewsItem;