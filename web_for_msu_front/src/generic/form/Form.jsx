import style from './form.module.css'
import InputEmail from "./inputs/InputEmail.jsx";
import InputPassword from "./inputs/InputPassword.jsx";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = []}) => {

  const showInput = ((input, index) => {
    switch (index) {
      case 'email':
        return <InputEmail/>
      case 'password':
        return <InputPassword/>
      default:
        return <input/>
    }
  })

  return (
    <form>
      {inputs.map((input, index) => {
        showInput(input, index)
      })}
    </form>
  );
};

export default Form;