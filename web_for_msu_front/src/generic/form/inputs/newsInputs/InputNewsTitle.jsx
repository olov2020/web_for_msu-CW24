import Input from '../Input.jsx'
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputNewsTitle = ({name, placeholder, fieldName, value, setValue}) => {

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
      setValue(undefined);
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
    <Input
      name={name}
      placeholder={placeholder}
      fieldName={fieldName}
      value={value}
      onChange={handleInputChange}
      error={error}
      isValid={isValid}
    />
  );
};

export default InputNewsTitle;