import styleInput from './input.module.css'
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputEmail = ({name = '', placeholder = '', value, setValue}) => {

  const [isValid, setIsValid] = useState(true);
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState('');
  const errors = {
    empty: (name.includes('parent') ?
      'Данное поле не может быть пустым. При отсутствии почты поставьте прочерк (-)' :
      'Данное поле не может быть пустым'),
    error: 'Данное поле должно быть заполнено корректно',
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
    if (inputValue === '-' && name.includes('parent')) {
      setIsValid(true);
      setError('');
      return '';
    }

    if (inputValue.length === 0) {
      return errors.empty;
    }

    if (!emailValidationRegex.test(inputValue)) {
      return errors.error;
    }

    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      {error}
      <input
        type='text'
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

export default InputEmail;