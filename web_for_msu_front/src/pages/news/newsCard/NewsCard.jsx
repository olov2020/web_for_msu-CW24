// eslint-disable-next-line react/prop-types
const NewsCard = ({photo, title, date, ...props}) => {
  return (
    <section {...props}>
      <img src={photo} alt={title}/>
      <h3>{title}</h3>
      <p>{date}</p>
    </section>
  );
};

export default NewsCard;