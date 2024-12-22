import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputYear = ({name = '', placeholder = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notValid: 'Данный год не допустен для выбора',
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

    // TODO check for year of end of school and university for pupil and teacher
    /*const year = new Date().getFullYear();
    if (inputValue > year + 4 || inputValue < year) {
      return errors.notValid;
    }*/

    setIsValid(true);
    formErrors = null;
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

export default InputYear;