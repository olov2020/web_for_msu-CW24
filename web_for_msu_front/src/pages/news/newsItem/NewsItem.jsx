// eslint-disable-next-line react/prop-types
const NewsItem = ({title, photo, text, key, ...props}) => {
  return (
    <section {...props} key={key}>
      <h1>{title}</h1>
      <img src={photo} alt={title}/>
      <p>{text}</p>
    </section>
  );
};

export default NewsItem;