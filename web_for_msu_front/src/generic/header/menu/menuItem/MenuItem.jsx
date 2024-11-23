import style from "../../header.module.css";
import {useState} from "react";
import MenuDropdown from "./menuDropdown/MenuDropdown.jsx";

// eslint-disable-next-line react/prop-types
const MenuItem = ({key, title, dropdown}) => {

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={style.menu__item} key={key}>
      <div className={style.menu__name}
           onMouseEnter={() => setShowMenu(true)}
           onMouseLeave={() => setShowMenu(false)}
      >
        <h2>{title}</h2>
      </div>

      {showMenu &&
        <MenuDropdown onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} items={dropdown} onClick={() => setShowMenu(false)}/>
      }
    </div>
  );
};

export default MenuItem;