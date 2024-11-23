import {Link} from "react-router-dom";
import style from '../news.module.css'

// eslint-disable-next-line react/prop-types
const NewsCard = ({photo, title, date, description, ...props}) => {

  return (
    <Link to={`/news/${title}/${date}`} state={{ photo: photo, title: title, description: description, date: date }}>
      <div {...props} className={style.newsCard}>
        <h3>{title}</h3>
        <img src={photo} alt={title}/>
        <p>{date}</p>
      </div>
    </Link>
  );
};

export default NewsCard;