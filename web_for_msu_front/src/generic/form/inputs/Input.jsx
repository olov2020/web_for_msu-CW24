import styleInput from "./userInputs/input.module.css";

// eslint-disable-next-line react/prop-types
const Input = ({fieldName = '', placeholder = '', isValid = true, error = '', ...props}) => {
  return (
    <label className={styleInput.label}>
      <p style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </p>
      
      <input {...props}
             placeholder={placeholder ? placeholder : ''}
             className={
               `${isValid ?
                 `${styleInput.valid}` :
                 `${styleInput.invalid}`}
                  ${styleInput.input}`
             }
      />

      <p className={styleInput.errorMessage}>
      {error}
      </p>
    </label>
  );
};

export default Input;