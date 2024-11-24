import styleInput from "./input.module.css";
import styleFileInput from './inputFile.module.css'
import {useEffect, useRef, useState} from "react";
import defaultUserImage from '../../../../../public/generic/default_user.svg'

// eslint-disable-next-line react/prop-types
const InputPhoto = ({name = '', fieldName, accept = '', required = false, setValue}) => {

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  useEffect(() => {
    if (uploadedImage.current) {
      uploadedImage.current.src = defaultUserImage;
      setValue(uploadedImage.current.src);
    }
  }, []);

  const handleInputChange = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const error = validateInput(file);

    if (error) {
      setIsValid(false);

      const {current} = uploadedImage;
      current.src = defaultUserImage;
      setValue(current.src);

      return;
    }

    const reader = new FileReader();
    const {current} = uploadedImage;
    current.file = file;
    reader.onload = e => {
      current.src = e.target.result;
      setValue(current.src);
    };
    reader.readAsDataURL(file);
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
    // TODO change to Input
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
          ref={imageUploader}
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
        onClick={() => imageUploader.current.click()}
        ref={uploadedImage}
        className={styleFileInput.photo}
        alt='Фото пользователя'
      />
    </div>
  );
};

export default InputPhoto;