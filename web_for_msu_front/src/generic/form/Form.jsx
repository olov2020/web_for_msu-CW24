import style from './form.module.css'
import InputEmail from "./inputs/InputEmail.jsx";
import InputPassword from "./inputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = [], buttonText, type}) => {

  const onClick = () => {

  }

  const showInput = (input) => {
    switch (input) {
      case 'email':
        return <InputEmail/>
      case 'password':
        return <InputPassword/>
      default:
        return <input/>
    }
  }

  return (
    <form className={style.form}>
      {inputs.map((input) => (
        showInput(input)
      ))}

      <ButtonSubmit text={buttonText} onClick={onClick}/>
    </form>
  );
};

export default Form;