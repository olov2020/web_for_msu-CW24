import {useState} from "react";
import Input from "../Input.jsx";

// eslint-disable-next-line react/prop-types
const InputCheckbox = ({name, initialChecked = false, required = false, fieldName, setValue}) => {

  const [isValid, setIsValid] = useState(true);
  const [checked, setChecked] = useState(initialChecked);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setChecked(e.target.value);
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (value) => {
    if (!required) {
      setIsValid(true);
      setError('');
      return '';
    }

    if (!value) {
      return errors.empty;
    }

    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <Input type='checkbox'
           name={name}
           value={checked}
           fieldName={fieldName}
           onChange={handleInputChange}
           error={error}
           isValid={isValid}
    />
  );
};

export default InputCheckbox;
