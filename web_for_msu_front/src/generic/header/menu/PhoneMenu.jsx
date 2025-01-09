import style from './menu.module.css';
import {useState} from "react";
import MenuItem from "./menuItem/MenuItem.jsx";

// eslint-disable-next-line react/prop-types
const PhoneMenu = ({menu}) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <section className={style.menu}>
      <div className={style.burger} onClick={handleClick}>
        <span className={`${style.line} ${clicked && style.line1}`}></span>
        <span className={`${style.line} ${clicked && style.line2}`}></span>
        <span className={`${style.line} ${clicked && style.line3}`}></span>
      </div>

      {clicked &&
        <nav className={style.nav}>
          {/* eslint-disable-next-line react/prop-types */}
          {menu.map(menuItem => (
            <MenuItem
              key={menuItem.id}
              id={menuItem.id}
              title={menuItem.title}
              dropdown={menuItem.dropdown}
            />
          ))}
        </nav>
      }
    </section>
  );
};

export default PhoneMenu;