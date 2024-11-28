import styleInput from "./input.module.css";
import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputText = ({name = '', placeholder='', fieldName, value, setValue}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
    }
  }

  const validateInput = (inputValue) => {
    if (inputValue.length === 0) {
      return errors.empty;
    }
    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <Input type='text'
           name={name}
           value={value}
           placeholder={placeholder}
           fieldName={fieldName}
           onChange={handleInputChange}
           error={error}
           isValid={isValid}
    />
  );
};

export default InputText;