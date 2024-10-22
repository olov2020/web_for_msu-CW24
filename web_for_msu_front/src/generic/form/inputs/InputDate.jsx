import styleInput from './input.module.css'
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputDate = ({name = '', placeholder='', value, setValue}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    errorInvalid: `${name} может содержать только буквы и знак дефиса`,
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
    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      {error}
      <input
        type='date'
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

export default InputDate;