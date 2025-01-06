import {useState} from "react";
import styleCheckboxInput from './inputCheckbox.module.css';
import styleInput from "./input.module.css";

// eslint-disable-next-line react/prop-types
const InputCheckbox = ({name, required = false, fieldName, setValue, value, formErrors}) => {

  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    const isChecked = e.target.checked;
    setValue(isChecked);
    const error = validateInput(isChecked);

    if (error) {
      formErrors(error);
      setError(error);
    } else {
      formErrors(false);
      setError('');
    }
  })

  const validateInput = (value) => {
    if (!required) {
      setError('');
      return '';
    }

    if (!value) {
      return errors.empty;
    }

    formErrors(false)
    setError('');
    return '';
  }

  return (

    <label className={styleCheckboxInput.checkboxContainer}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>

      <input type='checkbox'
             name={name}
             checked={value}
             onChange={handleInputChange}
      />
      <span className={styleCheckboxInput.checkmark}></span>

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </label>
  );
};

export default InputCheckbox;
