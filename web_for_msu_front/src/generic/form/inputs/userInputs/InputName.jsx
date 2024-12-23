import styleInput from "./input.module.css";
import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputName = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const nameValidationRegex = /^[a-zA-Zа-яА-ЯёЁ\-]+(?:\s+[a-zA-Zа-яА-ЯёЁ\-]+)*$/;
  const [error, setError] = useState('');
  const errors = {
    empty: (name.includes('lastname') ?
      'Данное поле не может быть пустым. Если отчества нет, поставьте прочерк (-)' :
      name.includes('parent') ?
        'Данное поле не может быть пустым. При отсутствии родителя / опекуна поставьте прочерк (-)' :
        'Данное поле не может быть пустым'),
    errorInvalid: `${placeholder} может содержать только буквы и знак дефиса`,
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      formErrors(error);
      console.log(formErrors);
      setError(error);
    }
  })

  const validateInput = (inputValue) => {
    if (inputValue.length === 0) {
      return errors.empty;
    }
    if (!nameValidationRegex.test(inputValue)) {
      return errors.errorInvalid;
    }

    setIsValid(true);
    setError('');
    formErrors(false);
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

export default InputName;