import style from './toggleSwitch.module.css';
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ funcOn, funcOff, value, onClick }) => {
  const [toggled, setToggled] = useState(value);
  const onToggle = async () => {
    try {
      if (!toggled) {
        const response = await funcOn();
        if (response) {
          setToggled(!toggled);
          onClick();
        }
        else {
          alert('Упс... что-то пошло не так');
        }
      } else {
        const response = await funcOff();
        if (response) {
          setToggled(!toggled);
          onClick();
        }
        else {
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