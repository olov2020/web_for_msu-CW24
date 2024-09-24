import styleInput from "./input.module.css";
import stylePhotoInput from './inputPhoto.module.css'
import {useEffect, useRef, useState} from "react";
import defaultUserImage from '../../../../public/registration/default_user.svg'

const InputPhoto = () => {

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
    }
  }, []);

  const handleInputChange = ((e) => {
    e.preventDefault();
    const [file] = e.target.files;
    const error = validateInput(file);

    if (error) {
      setIsValid(false);

      const { current } = uploadedImage;
      current.src = defaultUserImage;

      return;
    }

    const reader = new FileReader();
    const { current } = uploadedImage;
    current.file = file;
    reader.onload = e => {
      current.src = e.target.result;
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
    <label className={styleInput.label}>
      {error}
      <input
        type='file'
        name='file'
        multiple='false'
        accept="image/png, image/gif, image/jpeg, image/jpg"
        className={
          `${isValid ?
            `${styleInput.valid}` :
            `${styleInput.invalid}`}
          ${styleInput.input}
          ${stylePhotoInput.input}`
        }
        onChange={handleInputChange}
      />

      <img
        onClick={() => imageUploader.current.click()}
        ref={uploadedImage}
        className={stylePhotoInput.photo}
      />
    </label>
  );
};

export default InputPhoto;