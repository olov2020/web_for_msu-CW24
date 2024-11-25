import Form from "../../../generic/form/Form.jsx";
import styleApp from '../../../app.module.css'
import {useEffect, useState} from "react";
import {getCourseByFile} from "../../../api/coursesApi.js";
import InputFile from "../../../generic/form/inputs/userInputs/InputFile.jsx";

const AddNewCourse = () => {

  const [courseInfo, setCourseInfo] = useState({});
  const [file, setFile] = useState('');

  useEffect(() => {
    const getCourseInfo = async () => {
      if (file !== '') {
        const data = getCourseByFile(file);
        setCourseInfo(data);
      } else {
        console.log('Error uploading file');
      }
    }

    getCourseInfo();
  }, [])

  return (
    <article>
      <h1 className={styleApp.pageTitle}>Добавить новый курс</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        gap: '1rem 0',
      }}
      >
      <InputFile setValue={setFile} value={file} accept={'.xls, .xlsx, .csv'}/>

      <Form inputs={['courseName']} buttonText='Создать новый курс' type='addNewCourse'></Form>
      </div>
    </article>
  );
};

export default AddNewCourse;