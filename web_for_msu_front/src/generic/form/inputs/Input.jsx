import styleInput from "./userInputs/input.module.css";

// eslint-disable-next-line react/prop-types
const Input = ({value, fieldName = '', placeholder = '', isValid = true, error = '', ...props}) => {
  return (
    <label className={styleInput.label}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>
      
      <input {...props}
        value={value}
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