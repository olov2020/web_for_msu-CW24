import style from './toggleSwitch.module.css';

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ funcOn, funcOff, value, onClick }) => {

  const onToggle = async () => {
    try {
      if (!value) {
        const response = await funcOn();
        if (response) {
          onClick();
        }
      } else {
        const response = await funcOff();
        if (response) {
          onClick();
        }
      }
    } catch (error) {
      console.error('Error toggling admin role:', error);
    }
  };

  return (
    <label className={style.toggleSwitch}>
      <input type="checkbox" value={value} onChange={onToggle} />
      <span className={style.switch} />
    </label>
  );
};

export default ToggleSwitch;