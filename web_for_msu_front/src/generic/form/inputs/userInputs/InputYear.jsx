import {useState} from "react";
import Input from "../Input.jsx";
import style from './inputYear.module.css'

// eslint-disable-next-line react/prop-types
const InputYear = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notValid: 'Данный год не доступен для выбора',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      formErrors(error);
      setError(error);
    }
  })

  const validateInput = (inputValue) => {
    const currentYear = new Date().getFullYear();
    console.log(inputValue)
    console.log(currentYear)

    if (inputValue.length === 0) {
      return errors.empty;
    }

    if (name.includes('school') && (Number(inputValue) > currentYear + 4 || Number(inputValue) < currentYear)) {
      return errors.notValid;
    }

    if (name.includes('university') && (Number(inputValue) > currentYear || Number(inputValue) < 1950)) {
      return errors.notValid;
    }

    setIsValid(true);
    formErrors(false);
    setError('');
    return '';
  }

  return (
    <Input type='number'
           name={name}
           value={value}
           placeholder={placeholder}
           fieldName={fieldName}
           onChange={handleInputChange}
           error={error}
           isValid={isValid}
           className={style.numberInput}
    />
  );
};

export default InputYear;