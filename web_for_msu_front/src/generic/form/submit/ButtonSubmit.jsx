import styleSubmit from './submit.module.css'

// eslint-disable-next-line react/prop-types
const ButtonSubmit = ({text, onClick, type = 'submit', ...props}) => {
  return (
    <button className={
      `${type === 'submit' ?
        styleSubmit.submit :
        type === 'delete' ?
          styleSubmit.delete :
          styleSubmit.simple} ${styleSubmit.button}`
    } onClick={onClick} {...props}>
      <p>{text}</p>
    </button>
  );
};

export default ButtonSubmit;