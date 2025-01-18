import styleInput from "./input.module.css";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputDropdown = ({name, placeholder, fieldName, values = [], value, setValue, formErrors}) => {

  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const errors = {
    empty: 'Данное поле не может быть пустым',
    notInList: 'Выберете вариант из выпадающего списка',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      formErrors(true);
      setError(error);
    }
  })

  const validateInput = (inputValue) => {
    // eslint-disable-next-line react/prop-types
    if (inputValue.length === 0 && !name.includes('course') && !name.includes('teacher_result')) {
      return errors.empty;
    }

    // eslint-disable-next-line react/prop-types
    if ((name.includes('course') || name.includes('teacher_result')) && !values.includes(inputValue)) {
      return errors.notInList;
    }

    setIsValid(true);
    formErrors(false);
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>

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

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </label>
  );
};

export default InputDropdown;
