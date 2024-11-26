import Form from "../../../generic/form/Form.jsx";
import {useEffect, useState} from "react";
import {courseAdd, getCourseByFile} from "../../../api/coursesApi.js";
import InputFile from "../../../generic/form/inputs/userInputs/InputFile.jsx";

const AddNewCourse = () => {

  /*const [courseInfo, setCourseInfo] = useState({});

  useEffect(() => {
    const getCourseInfo = async () => {
      const data = getCourseByFile();
        setCourseInfo(data);
    }

    getCourseInfo();
  }, [])*/

  return (
    <article>
      <h1>Добавить новый курс</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        gap: '5rem 0',
      }}
      >
        <Form inputs={['courseFile']} buttonText='Создать новый курс' type='courseAdd'></Form>
      </div>
    </article>
  );
};

export default AddNewCourse;