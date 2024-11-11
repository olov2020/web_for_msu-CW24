import Form from "../../../generic/form/Form.jsx";
import styleApp from '../../../app.module.css'
import style from './addNewCourse.module.css'
import {useEffect, useState} from "react";
import {getCourseByFile} from "../../../api/userApi.js";
import InputFile from "../../../generic/form/userInputs/InputFile.jsx";

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
    <section className={styleApp.pageSection}>
      <h1 className={styleApp.pageTitle}>Добавить новый курс</h1>

      <InputFile setValue={setFile} value={file} accept={'.xls, .xlsx, .csv'}/>

      <Form inputs={['courseName']} buttonText='Создать новый курс' type='addNewCourse'></Form>
    </section>
  );
};

export default AddNewCourse;