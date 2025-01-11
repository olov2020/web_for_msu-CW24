import {Link} from "react-router-dom";
import style from '../news.module.css'

// eslint-disable-next-line react/prop-types
const NewsCard = ({photo = null, title, date, description, id}) => {

  return (
    <Link to={`/news/${title}/${date}`} state={{id, photo, title, description, date}}
          className={style.newsCard}
    >
      <h3>{title}</h3>
      {photo &&
      <img src={photo} alt={title}
          style={{
            width: '100%',
            height: '20rem',
            objectFit: 'cover',
          }}
      />
      }

      <p
        style={{
          alignSelf: 'flex-end',
        }}
      >{date}</p>
    </Link>
  );
};

export default NewsCard;