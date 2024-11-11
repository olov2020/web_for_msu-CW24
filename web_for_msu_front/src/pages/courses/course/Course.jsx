import style from './course.module.css'

// eslint-disable-next-line react/prop-types
const Course = ({key, item}) => {

  return (
    <div key={key}>
      {item}
    </div>
  );
};

export default Course;