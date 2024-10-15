import styleInput from "./input.module.css";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputYear = ({name = '', placeholder = '', value, setValue}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notValid: 'Данный год не допустен для выбора',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (inputValue) => {
    if (inputValue.length === 0) {
      return errors.empty;
    }

    // TODO check for year of end of school and university for pupil and teacher
    /*const year = new Date().getFullYear();
    if (inputValue > year + 4 || inputValue < year) {
      return errors.notValid;
    }*/

    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      {error}
      <input
        type='number'
        name={name}
        placeholder={placeholder}
        value={value}
        className={
          `${isValid ?
            `${styleInput.valid}` :
            `${styleInput.invalid}`}
          ${styleInput.input}`
        }
        onChange={handleInputChange}
      />
    </label>
  );
};

export default InputYear;