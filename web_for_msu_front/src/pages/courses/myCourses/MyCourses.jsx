import {useSelector} from "react-redux";
import {getCoursesByUserId} from "../../../api/userApi.js";
import {useEffect, useState} from "react";
import Course from "../course/Course.jsx";

const MyCourses = () => {

  const user = useSelector(state => state.user);
  const userId = user.id;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await getCoursesByUserId(user.id);
      setCourses(data);
    }

    getCourses();
  }, [])

  return (
    <div>
      Мои курсы
      {/*{courses.map((item, index) => (
        <Course key={index} item={item} />
      ))}*/}
    </div>
  );
};

export default MyCourses;