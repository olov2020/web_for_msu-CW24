import {useState} from 'react';
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputClass = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notValid: 'Данный класс не доступен',
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
    if (inputValue.length === 0) {
      return errors.empty;
    } else if (inputValue < 8 || inputValue > 11) {
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
    />
  );
};

export default InputClass;