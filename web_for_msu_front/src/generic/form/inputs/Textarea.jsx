import styleInput from "./userInputs/input.module.css";

// eslint-disable-next-line react/prop-types
const Textarea = ({fieldName = '', placeholder = '', isValid = true, error = '', ...props}) => {
  return (
    <label className={styleInput.label}>
      <h3 style={{
        alignSelf: 'flex-start',
      }}>
        {fieldName}
      </h3>

      <textarea {...props}
             placeholder={placeholder ? placeholder : ''}
             className={
               `${isValid ?
                 `${styleInput.valid}` :
                 `${styleInput.invalid}`}
                  ${styleInput.textarea}`
             }
      />

      <p className={styleInput.errorMessage}>
        {error}
      </p>
    </label>
  );
};

export default Textarea;