import styleInput from "./input.module.css";
import InputMask from 'react-input-mask';
import {useState} from "react";

const InputPhone = () => {

  const [isValid, setIsValid] = useState(true);
  const [phone, setPhone] = useState();
  const [error, setError] = useState('');
  const phoneMask = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  const errors = {
    empty: 'Данное поле не может быть пустым',
    errorLength: 'Введите номер телефона полностью',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setPhone(e.target.value);
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
    if (!phoneMask.test(value)) {
      return errors.errorLength;
    }
    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      {error}
      <InputMask
        mask="+7 (999) 999-99-99"
        type='phone'
        name='phone'
        placeholder='Телефон'
        value={phone}
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

export default InputPhone;