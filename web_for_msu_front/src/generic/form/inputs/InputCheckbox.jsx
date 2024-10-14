import styleInput from "./input.module.css";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputCheckbox = ({name, placeholder, initialChecked = false, required = false, setValue}) => {

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
    <label className={
      `${isValid ?
        `${styleInput.valid}` :
        `${styleInput.invalid}`}
                  ${styleInput.input}
                  ${styleInput.label}`
    }>
      {error}
      <input
        type='checkbox'
        name={name}
        value={checked}
        onChange={handleInputChange}
      />
      <p>{placeholder}</p>
    </label>
  );
};

export default InputCheckbox;
