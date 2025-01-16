import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputText = ({name = '', placeholder='', fieldName, value, setValue, formErrors = undefined}) => {

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
      formErrors(error);
      setError(error);
    }
  }

  const validateInput = (inputValue) => {
    if (inputValue.length === 0 && !name.includes('search pupils') && !name.includes('auditory') && !name.match(/^\d+\s\d{2}\.\d{2}\.\d{4}\s([A-Za-zА-Яа-я]+\s?)+$/) && !name.includes('visits')) {
      return errors.empty;
    }

    setIsValid(true);
    formErrors(false);
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