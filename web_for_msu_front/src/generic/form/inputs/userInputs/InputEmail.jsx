import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputEmail = ({name = '', placeholder = '', fieldName = '', value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState('');
  const errors = {
    empty: (name.includes('parent') ?
      'Данное поле не может быть пустым. При отсутствии почты поставьте прочерк (-)' :
      'Данное поле не может быть пустым'),
    error: 'Данное поле должно быть заполнено корректно',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      formErrors(error);
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (inputValue) => {
    if (inputValue === '-' && name.includes('parent')) {
      setIsValid(true);
      setError('');
      return '';
    }

    if (inputValue.length === 0) {
      return errors.empty;
    }

    if (!emailValidationRegex.test(inputValue)) {
      return errors.error;
    }

    setIsValid(true);
    setError('');
    formErrors(false);
    return '';
  }

  return (
    <Input type='email'
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

export default InputEmail;