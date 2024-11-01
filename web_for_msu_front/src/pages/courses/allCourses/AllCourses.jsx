import {useSelector} from "react-redux";
import {getAllCourses} from "../../../api/userApi.js";
import {useEffect, useState} from "react";
import Course from "../course/Course.jsx";

const AllCourses = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await getAllCourses();
      setCourses(data);
    }

    getCourses();
  }, [])

  return (
    <div>
      Все курсы
      {/*{courses.map((item, index) => (
        <Course key={index} item={item} />
      ))}*/}
    </div>
  );
};

export default AllCourses;