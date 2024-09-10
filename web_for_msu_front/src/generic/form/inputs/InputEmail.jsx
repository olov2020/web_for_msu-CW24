import styleInput from './input.module.css'
import {useState} from "react";

const InputEmail = () => {

  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    error: 'Данное поле должно быть заполнено корректно',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setEmail(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (value) => {
    if (value.length === 0) {
      return errors.empty;
    }
    if (!emailValidationRegex.test(email)) {
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
        name='email'
        placeholder='Почта'
        value={email}
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