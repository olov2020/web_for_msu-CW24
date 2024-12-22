import styleInput from "./input.module.css";
import {useState} from "react";
import Input from "../Input.jsx";


// eslint-disable-next-line react/prop-types
const InputMessenger = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: `Данное поле не может быть пустым. Поставьте прочерк (-) при отсутствии ${placeholder}`,
    errorInvalid: `Ссылка должна начинаться с @`,
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
    if (inputValue.length === 0) {
      return errors.empty;
    }
    if (inputValue[0] !== '@' && inputValue[0] !== '-') {
      return errors.errorInvalid;
    }

    setIsValid(true);
    formErrors = null;
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

export default InputMessenger;