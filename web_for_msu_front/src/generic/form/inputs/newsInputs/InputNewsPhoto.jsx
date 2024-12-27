import styleFileInput from "../userInputs/inputFile.module.css";
import styleInput from "../userInputs/input.module.css";
import {useState} from "react";
import defaultNewsImage from "../../../../../public/msu_logo.png";

// eslint-disable-next-line react/prop-types
const InputNewsPhoto = ({name = '', fieldName, accept = '', multiple = false, required = false, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }



  const handleInputChange = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const error = validateInput(file);
    setValue(file);

    if (error) {
      setIsValid(false);
      formErrors(error);

      setValue(defaultNewsImage);

      return;
    }

  })

  const validateInput = (value) => {
    if (!value) {
      return errors.empty;
    }

    setIsValid(true);
    formErrors(false);
    setError('');
    return '';
  }

  return (
    <div className={styleFileInput.container}>
      <label className={`${styleFileInput.label} ${styleInput.label}`}>
        <h3 style={{
          alignSelf: 'flex-start',
        }}>
          {fieldName}
        </h3>

        <input
          type='file'
          required={required}
          name={name}
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

        <p className={styleInput.errorMessage}>
          {error}
        </p>
      </label>

      <img
        className={styleFileInput.photoNews}
        alt='Фото новости'
      />
    </div>
  );
};

export default InputNewsPhoto;