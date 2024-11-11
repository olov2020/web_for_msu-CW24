import styleInput from "./userInputs/input.module.css";

const Input = ({...props}) => {
  return (
    <label className={styleInput.label}>
      <p style={{
        alignSelf: 'flex-start',
      }}>
        {props.fieldName}
      </p>
      
      <input {...props}
             placeholder={props.fieldName}
             className={
               `${props.isValid ?
                 `${styleInput.valid}` :
                 `${styleInput.invalid}`}
                  ${styleInput.input}`
             }
      />

      <p className={styleInput.errorMessage}>
      {props.error}
      </p>
    </label>
  );
};

export default Input;