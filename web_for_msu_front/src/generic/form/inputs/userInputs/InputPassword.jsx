import styleInput from "./input.module.css";
import styleInputPassword from './inputPassword.module.css'
import {useState} from "react";
import {FiEye} from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const InputPassword = ({name, placeholder, fieldName, value, setValue, formErrors}) => {
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const errors = {
    notLongEnough: 'Длина пароля должна быть минимум 8 символов',
    notUpperCase: 'Пароль должен содержать хотя бы один заглавный символ',
    notLowerCase: 'Пароль должен содержать хотя бы один строчный символ',
    notNumber: 'Пароль должен содержать хотя бы одну цифру',
    notSpecial: 'Пароль должен содержать хотя бы один специальный символ',
    notConsecutive: 'Пароль не должен содержать больше двух последовательно одинаковых символов',
    notCommon: 'Пароль слишком простой, пожалуйста, придумайте новый',
  }

  const handleInputChange = ((e) => {
    e.preventDefault();
    setValue(e.target.value);
    const error = validateInput(e.target.value);

    if (error) {
      formErrors(error);
      setIsValid(false);
      setError(error)
    }
  })

  const validateInput = (password) => {
    // 1. Length check: At least 8 characters
    if (password.length < 8) {
      return errors.notLongEnough;
    }

    // 2. Uppercase check: At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return errors.notUpperCase;
    }

    // 3. Lowercase check: At least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return errors.notLowerCase;
    }

    // 4. Number check: At least one number
    if (!/[0-9]/.test(password)) {
      return errors.notNumber;
    }

    const commonPatterns = [
      "password",
      "12345678",
      "qwerty",
      "123123",
      "1234",
    ];
    for (const pattern of commonPatterns) {
      if (password === pattern) {
        return errors.notCommon;
      }
    }

    // All checks passed!
    setIsValid(true);
    setError('')
    formErrors(false);
    return '';
  }

  return (
    <label className={styleInput.label}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>

      <input
        type={showPassword ? 'text' : 'password'}
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

      <FiEye className={styleInputPassword.showPassword} onClick={() => setShowPassword(!showPassword)}/>

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </label>
  );
};

export default InputPassword;