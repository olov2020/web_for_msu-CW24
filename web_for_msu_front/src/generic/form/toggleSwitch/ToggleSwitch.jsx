import style from './toggleSwitch.module.css';

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ funcOn, funcOff, value, onClick }) => {
  const onToggle = async () => {
    try {
      if (!value) {
        try {
          await funcOn();
          onClick();
        } catch {
          alert('Упс... что-то пошло не так');
        }
      } else {
        try {
          await funcOff();
          onClick();
        } catch {
          alert('Упс... что-то пошло не так');
        }
      }
    } catch (error) {
      console.error('Error toggling admin role:', error);
    }
  };

  return (
    <label className={style.toggleSwitch}>
      <input type="checkbox" checked={value} onChange={onToggle} />
      <span className={style.switch} />
    </label>
  );
};

export default ToggleSwitch;