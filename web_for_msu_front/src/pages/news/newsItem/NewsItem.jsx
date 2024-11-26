import {useLocation} from "react-router-dom";
import deleteIcon from '../../../../public/generic/deleteIcon.svg'
import DeleteWindow from "./deleteWindow/DeleteWindow.jsx";
import {useState} from "react";

const NewsItem = () => {

  const {state} = useLocation();
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);

  return (
    <article key={state.key}>
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
          {showDeleteWindow && <DeleteWindow setShowDeleteWindow={setShowDeleteWindow} newsId={state.key}/>}
        </div>
      </section>

      <img src={state.photo} alt={state.title}
           style={{
             width: "30vw",
             objectFit: 'contain',
           }}
      />

      <p style={{
        margin: '0 2rem',
      }}
      >
        {state.description}
      </p>
    </article>
  );
};

export default NewsItem;