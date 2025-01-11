import {useLocation} from "react-router-dom";
import deleteIcon from '../../../../public/generic/deleteIcon.svg'
import DeleteWindow from "./deleteWindow/DeleteWindow.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";

const NewsItem = () => {

  const {state} = useLocation();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const authStatus = useSelector(state => state.user.authStatus);

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
        width: '60%',
      }}
      >
        {state.description}
      </p>
    </article>
  );
};

export default NewsItem;