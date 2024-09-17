import styleInput from "./input.module.css";
import {useRef, useState} from "react";

const InputPhoto = () => {

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    const [file] = e.target.files;
    const error = validateInput(file);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
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
        className={
          `${isValid ?
            `${styleInput.valid}` :
            `${styleInput.invalid}`}
          ${styleInput.input}`
        }
        onChange={handleInputChange}
      />

      <img
        onClick={() => imageUploader.current.click()}
        ref={uploadedImage}
        style={{
          width: "10rem",
          height: "10rem",
        }}
      />
    </label>
  );
};

export default InputPhoto;