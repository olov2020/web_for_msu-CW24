import styleFileInput from "../userInputs/inputFile.module.css";
import styleInput from "../userInputs/input.module.css";
import {useState, useRef} from "react";
import defaultNewsImage from "../../../../../public/msu_logo.png";

// eslint-disable-next-line react/prop-types
const InputNewsPhoto = ({name = '', fieldName, accept = '', multiple = false, required = false, setValue}) => {

  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(defaultNewsImage);
  const fileInputRef = useRef(null);
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const error = validateInput(file);

    if (error) {
      setValue(undefined);
      setImageUrl(defaultNewsImage);
    } else {
      const reader = new FileReader();
      setValue(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  })

  const validateInput = (value) => {
    if (!value) {
      return errors.empty;
    }

    setError('');
    return '';
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
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
            `${styleInput.input}
          ${styleFileInput.input}`
          }
          onChange={handleInputChange}
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
        />

        <p className={styleInput.errorMessage}>
          {error}
        </p>
      </label>

      <img
        className={styleFileInput.photoNews}
        src={imageUrl}
        alt='Фото новости'
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }} // Make the image clickable
      />
    </div>
  );
};

export default InputNewsPhoto;
