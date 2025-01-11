import { useState } from "react";
import style from './toggleSwitch.module.css';

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ funcOn, funcOff, value, onClick }) => {
  const [isToggled, setIsToggled] = useState(value);

  const onToggle = async () => {
    try {
      if (!isToggled) {
        const response = await funcOn();
        if (response) {
          setIsToggled(true);
          onClick();
        }
      } else {
        const response = await funcOff();
        if (response) {
          setIsToggled(false);
          onClick();
        }
      }
    } catch (error) {
      console.error('Error toggling admin role:', error);
    }
  };

  return (
    <label className={style.toggleSwitch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={style.switch} />
    </label>
  );
};

export default ToggleSwitch;
