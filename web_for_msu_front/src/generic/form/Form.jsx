import style from './form.module.css'
import InputEmail from "./inputs/InputEmail.jsx";
import InputPassword from "./inputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";
import {userLogin, userRegistration} from "../../api/userApi.js";
import InputPhoto from "./inputs/InputPhoto.jsx";
import InputName from "./inputs/InputName.jsx";
import InputDate from "./inputs/InputDate.jsx";
import InputPhone from "./inputs/InputPhone.jsx";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = [], buttonText, type}) => {

  const onClick = () => {
    switch (type) {
      case 'login':
        userLogin();
      case 'registration':
        userRegistration();
        <input/>
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
      case 'name':
        return <InputName nameText='name' nameType='Имя'/>
      case 'surname':
        return <InputName nameText='surname' nameType='Фамилия'/>
      case 'lastname':
        return <InputName nameText='lastname' nameType='Отчество'/>
      case 'birthDate':
        return <InputDate nameText='birthDate' nameType='День рождения'/>
      case 'phone':
        return <InputPhone/>
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