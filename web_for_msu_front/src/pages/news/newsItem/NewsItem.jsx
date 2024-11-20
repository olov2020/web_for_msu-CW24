import {useParams} from "react-router-dom";

const NewsItem = () => {

  const params = useParams();

  return (
    <section>
      <h1>{params.title}</h1>
      <img src={params.photo} alt={params.title}/>
      <p>{params.description}</p>
      <p>{params.date}</p>
    </section>
  );
};

export default NewsItem;