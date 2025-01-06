import styleInputFile from "./inputFile.module.css";
import styleInput from "./input.module.css";
import {useRef, useState} from "react";

// eslint-disable-next-line react/prop-types
const InputFile = ({name = '', fieldName, accept = '', multiple = false, required = false, setValue, formErrors}) => {

  const fileUploader = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const error = validateInput(file);

    if (error) {
      setIsValid(false);
      formErrors(error);
      setValue(null);
      setFileName('');
      return;
    }

    setValue(file);
    setFileName(file.name);
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

  const handleButtonClick = () => {
    fileUploader.current.click();
  }

  return (
    <div className={styleInputFile.container}>
      <label className={styleInput.label}>
        <h3>{fieldName}</h3>
      </label>

      <input
        type='file'
        name={name}
        ref={fileUploader}
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        required={required}
        className={styleInputFile.fileInput}
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className={`${styleInputFile.customFileInput} ${isValid ? styleInput.valid : styleInput.invalid}`}
      >
        Выберете файл
      </button>

      {fileName && (
        <div>
          <h3 className={styleInputFile.successMessage}>Файл успешно добавлен</h3>
          <p>{fileName}</p>
        </div>
      )}

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </div>
  );
};

export default InputFile;
