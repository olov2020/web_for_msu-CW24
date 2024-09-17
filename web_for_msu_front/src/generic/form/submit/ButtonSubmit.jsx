import styleSubmit from './submit.module.css'

// eslint-disable-next-line react/prop-types
const ButtonSubmit = ({text, onClick}) => {
  return (
    <button className={styleSubmit.submit} onClick={onClick}>
      <p>{text}</p>
    </button>
  );
};

export default ButtonSubmit;