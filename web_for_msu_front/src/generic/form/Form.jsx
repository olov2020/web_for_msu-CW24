import style from './form.module.css'
import InputEmail from "./inputs/InputEmail.jsx";
import InputPassword from "./inputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";
import {userLogin, userRegistration} from "../../api/userApi.js";
import InputPhoto from "./inputs/InputPhoto.jsx";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = [], buttonText, type}) => {

  const onClick = () => {
    switch (type) {
      case 'login':
        userLogin();
      case 'registration':
        userRegistration();
    }
  }

  const showInput = (input) => {
    switch (input) {
      case 'email':
        return <InputEmail/>
      case 'password':
        return <InputPassword/>
      case 'photo':
        return <InputPhoto/>
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