import {useLocation} from "react-router-dom";

const NewsItem = () => {

  const { state } = useLocation();

  return (
    <article key={state.key}>
      <h1>{state.title}</h1>

      <p style={{
        alignSelf: 'flex-end',
        marginRight: '2rem',
      }}
      >
        {state.date}
      </p>

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