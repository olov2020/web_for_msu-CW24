import {Link} from "react-router-dom";
import style from '../news.module.css'

// eslint-disable-next-line react/prop-types
const NewsCard = ({photo, title, date, description, id}) => {

  return (
    <Link to={`/news/${title}/${date}`} state={{id, photo, title, description, date}}
          className={style.newsCard}
          key={id}
    >
      <h3>{title}</h3>
      <img src={photo} alt={title}
          style={{
            width: '100%',
            height: '20rem',
            objectFit: 'cover',
          }}
      />
      <p style={{
        alignSelf: 'flex-end',
      }}>{date}</p>
    </Link>
  );
};

export default NewsCard;