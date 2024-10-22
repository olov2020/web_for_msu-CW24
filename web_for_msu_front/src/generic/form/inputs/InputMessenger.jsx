import styleInput from "./input.module.css";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const InputMessenger = ({name = '', placeholder = '', value, setValue}) => {

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
    setError('');
    return '';
  }

  return (
    <label className={styleInput.label}>
      {error}
      <input
        type='text'
        name={name}
        placeholder={placeholder}
        value={value}
        className={
          `${isValid ?
            `${styleInput.valid}` :
            `${styleInput.invalid}`}
          ${styleInput.input}`
        }
        onChange={handleInputChange}
      />
    </label>
  );
};

export default InputMessenger;