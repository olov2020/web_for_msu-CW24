import styleInput from "./input.module.css";
import InputMask from 'react-input-mask';
import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputPhone = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const phoneMask = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  const errors = {
    empty: (name.includes('parent') ?
      'Данное поле не может быть пустым. При отсутствии телефона начните вводить нули' :
      'Данное поле не может быть пустым'),
    errorLength: 'Введите номер телефона полностью',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      formErrors = error;
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (inputValue) => {
    if (inputValue.includes('000')) {
      setIsValid(true);
      setError('');
      return '';
    }

    if (inputValue.length === 0) {
      return errors.empty;
    }

    if (!phoneMask.test(inputValue)) {
      return errors.errorLength;
    }

    setIsValid(true);
    formErrors = null;
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>

      <InputMask
        mask="+7 (999) 999-99-99"
        type='phone'
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

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </label>
  );
};

export default InputPhone;