import styleInput from './input.module.css'
import {useState} from "react";

const InputEmail = () => {

  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    empty: 'Данное поле не может быть пустым',
    error: 'Данное поле должно быть заполнено корректно',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setEmail(e.target.value);
    const error = validateInput(email);

    if (error) {
      setIsValid(false);
      console.log(error);
    }
  })

  const validateInput = ((value) => {
    if (value.length === 0) {
      return errors.empty;
    }
    if (!emailValidationRegex.test(email)) {
      return errors.error;
    }
    setIsValid(true);
    return '';
  })

  return (
    <label>
      <input
        type='text'
        name='email'
        placeholder='Почта'
        value={email}
        className={
          isValid ?
            `${styleInput.valid}` :
            `${styleInput.invalid}`
        }
        onChange={handleInputChange}
      />
    </label>
  );
};

export default InputEmail;