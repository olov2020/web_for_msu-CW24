import styleFileInput from "../userInputs/inputFile.module.css";
import styleInput from "../userInputs/input.module.css";
import {useEffect, useRef, useState} from "react";
import defaultNewsImage from "../../../../../public/msu_logo.png";

// eslint-disable-next-line react/prop-types
const InputNewsPhoto = ({name = '', fieldName, accept = '', multiple = false, required = false, setValue, formErrors}) => {

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  useEffect(() => {
    if (uploadedImage.current) {
      uploadedImage.current.src = defaultNewsImage;
      setValue(uploadedImage.current.src);
    }
  }, []);

  const handleInputChange = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const error = validateInput(file);

    if (error) {
      setIsValid(false);
      formErrors = error;

      const {current} = uploadedImage;
      current.src = defaultNewsImage;
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
    formErrors = null;
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
          ref={imageUploader}
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
        onClick={() => imageUploader.current.click()}
        ref={uploadedImage}
        className={styleFileInput.photoNews}
        alt='Фото новости'
      />
    </div>
  );
};

export default InputNewsPhoto;