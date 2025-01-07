import {useState} from "react";
import Input from '../Input.jsx'

// eslint-disable-next-line react/prop-types
const InputDate = ({name = '', fieldName, value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notValid: 'Данная дата не доступна для выбора',
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
    }

    const inputDate = new Date(inputValue);
    const prevDate = new Date('1930-01-01');
    if (inputDate.getTime() < prevDate.getTime() || inputDate.getTime() > new Date().getTime()) {
      return errors.notValid;
    }

    setIsValid(true);
    formErrors(false);
    setError('');
    return '';
  }

  return (
    <Input
      type='date'
      name={name}
      fieldName={fieldName}
      error={error}
      onChange={handleInputChange}
      value={value}
      isValid={isValid}
    />
  );
};

export default InputDate;