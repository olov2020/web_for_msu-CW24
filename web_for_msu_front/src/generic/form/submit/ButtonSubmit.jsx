import styleSubmit from './submit.module.css'

// eslint-disable-next-line react/prop-types
const ButtonSubmit = ({text}) => {
  return (
    <button className={styleSubmit.submit}>
      <p>{text}</p>
    </button>
  );
};

export default ButtonSubmit;