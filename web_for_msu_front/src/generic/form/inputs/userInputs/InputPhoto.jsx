import styleInput from "./input.module.css";
import styleFileInput from './inputFile.module.css'
import {useState} from "react";
import defaultUserImage from '../../../../../public/generic/default_user.svg'

// eslint-disable-next-line react/prop-types
const InputPhoto = ({name = '', fieldName, accept = '', required = false, setValue, formErrors}) => {

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
      setValue(defaultUserImage);

    }

  })

  const validateInput = (value) => {
    if (!value) {
      return errors.empty;
    }

    setIsValid(true);
    setError('');
    formErrors(false);
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
          multiple={false}
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
       /* onClick={() => imageUploader.current.click()}
        ref={uploadedImage}*/
        className={styleFileInput.photo}
        alt='Фото пользователя'
      />
    </div>
  );
};

export default InputPhoto;