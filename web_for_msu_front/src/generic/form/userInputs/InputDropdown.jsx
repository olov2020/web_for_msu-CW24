import styleInput from "./input.module.css";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputDropdown = ({name, placeholder, values = [], value, setValue}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (inputValue) => {
    if (inputValue.length === 0) {
      return errors.empty;
    }
    
    setIsValid(true);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      {error}
      <input list="dropdown-options"
             className={
               `${isValid ?
                 `${styleInput.valid}` :
                 `${styleInput.invalid}`}
                  ${styleInput.input}`
             }
             type='text'
             name={name}
             placeholder={placeholder}
             value={value}
             onChange={handleInputChange}
      />
      <datalist id="dropdown-options">
        {values.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </datalist>
    </label>
  );
};

export default InputDropdown;
