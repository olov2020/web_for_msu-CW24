import { useState } from "react";
import style from './toggleSwitch.module.css';

// eslint-disable-next-line react/prop-types
const ToggleSwitch = ({ addAdmin, deleteAdmin }) => {
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = async () => {
    try {
      if (!isToggled) {
        const response = await addAdmin();
        alert(response);
        if (response) {
          setIsToggled(true);
        }
      } else {
        const response = await deleteAdmin();
        alert(response);
        if (response) {
          setIsToggled(false);
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
