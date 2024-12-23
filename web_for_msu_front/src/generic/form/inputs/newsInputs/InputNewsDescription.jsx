import {useState} from "react";
import Textarea from "../Textarea.jsx";

// eslint-disable-next-line react/prop-types
const InputNewsDescription = ({name, placeholder, fieldName, value, setValue, formErrors}) => {

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
      setValue(undefined);
      console.log(error);
    }
  }

  const validateInput = (inputValue) => {
    if (inputValue.length === 0) {
      return errors.empty;
    }

    setIsValid(true);
    formErrors(false);
    setError('');
    return '';
  }

  return (
    <Textarea
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

export default InputNewsDescription;