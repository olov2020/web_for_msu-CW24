import {useState} from "react";
import Input from "../Input.jsx";
import style from './inputYear.module.css'

// eslint-disable-next-line react/prop-types
const InputYear = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notValidYear: 'Данный год не доступен для выбора',
    notValidClass: 'Данный класс не доступен для выбора',
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

    if (inputValue.length === 0) {
      return errors.empty;
    }

    if (name.includes('schoolClass') && (Number(inputValue) > 11 || Number(inputValue) < 8)) {
      return errors.notValidClass;
    }

    if (name.includes('schoolEndDate') && Number(inputValue) > currentYear) {
      return errors.notValidYear;
    }

    if (name.includes('universityEndDate') && (Number(inputValue) > currentYear + 6 || Number(inputValue) < 1950)) {
      return errors.notValidYear;
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