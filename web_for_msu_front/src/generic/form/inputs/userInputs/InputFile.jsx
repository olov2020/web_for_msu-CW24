import styleInput from "./input.module.css";
import styleFileInput from './inputFile.module.css'
import {useRef, useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputFile = ({name = '', fieldName, accept = '', multiple = false, required = false, setValue}) => {

  const fileUploader = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const error = validateInput(file);

    if (error) {
      setIsValid(false);
      setValue(null);

      return;
    }

    setValue(file);
  })

  const validateInput = (value) => {
    if (!value) {
      return errors.empty;
    }

    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>

      <input type='file'
             name={name}
             ref={fileUploader}
             multiple={multiple}
             accept={accept}
             onChange={handleInputChange}
             required={required}
             className={
               `${isValid ?
                 `${styleInput.valid}` :
                 `${styleInput.invalid}`}
                  ${styleInput.input}`
             }
      />

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </label>
  );
};

export default InputFile;