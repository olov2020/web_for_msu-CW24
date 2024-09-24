import styleInput from "./input.module.css";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const InputName = ({nameType = '', nameText = ''}) => {

  const [isValid, setIsValid] = useState(true);
  const nameValidationRegex = /^[a-zA-Zа-яА-ЯёЁ\-]+(?:\s+[a-zA-Zа-яА-ЯёЁ\-]+)*$/;
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const errors = {
    empty: (nameType === 'Отчество' ?
    'Данное поле не может быть пустым. Если отчества нет, поставьте прочерк (-)':
    'Данное поле не может быть пустым'),
    errorInvalid: `${nameType} может содержать только буквы и знак дефиса`,
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setName(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      setIsValid(false);
      setError(error);
      console.log(error);
    }
  })

  const validateInput = (value) => {
    if (value.length === 0) {
      return errors.empty;
    }
    if (!nameValidationRegex.test(value)) {
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
        name={nameText}
        placeholder={nameType}
        value={name}
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