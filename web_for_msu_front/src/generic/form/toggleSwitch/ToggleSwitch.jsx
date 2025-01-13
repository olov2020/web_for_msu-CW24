import style from './toggleSwitch.module.css';
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ funcOn, funcOff, value, onClick }) => {
  const [toggled, setToggled] = useState(value);
  const onToggle = async () => {
    try {
      if (!value) {
        try {
          await funcOn();
          onClick();
          setToggled(!toggled);
        } catch {
          alert('Упс... что-то пошло не так');
        }
      } else {
        try {
          await funcOff();
          onClick();
          setToggled(!toggled);
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
      <input type="checkbox" value={toggled} onChange={onToggle} />
      <span className={style.switch} />
    </label>
  );
};

export default ToggleSwitch;