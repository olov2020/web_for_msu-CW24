import styleInput from "./input.module.css";
import styleFileInput from './inputFile.module.css'
import {useRef, useState} from "react";

// eslint-disable-next-line react/prop-types
const InputFile = ({name = '', accept = '', multiple = false, text = '', setValue}) => {

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
    <div className={styleFileInput.container}>
      <label className={`${styleFileInput.label} ${styleInput.label}`}>
        {error}
        <input
          type='file'
          name={name}
          ref={fileUploader}
          multiple={multiple}
          accept={accept}
          className={
            `${isValid ?
              `${styleInput.valid}` :
              `${styleInput.invalid}`}
          ${styleInput.input}
          ${styleFileInput.input}`
          }
          onChange={handleInputChange}
        />

        <p>{text}</p>
      </label>
    </div>
  );
};

export default InputFile;