import styleInput from "./input.module.css";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const InputName = ({name = '', placeholder = '', value, setValue}) => {

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
      setError(error);
      console.log(error);
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

export default InputName;