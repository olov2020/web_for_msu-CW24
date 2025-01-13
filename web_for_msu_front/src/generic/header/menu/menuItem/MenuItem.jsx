import style from "../../header.module.css";
import {useEffect, useRef, useState} from "react";
import MenuDropdown from "./menuDropdown/MenuDropdown.jsx";

// eslint-disable-next-line react/prop-types
const MenuItem = ({id, title, dropdown}) => {

  const [showMenu, setShowMenu] = useState(false);
  const componentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className={style.menu__item} key={id}>
      <div className={style.menu__name}
           onMouseEnter={() => setShowMenu(true)}
           onMouseLeave={() => setShowMenu(false)}
           onClick={() => setShowMenu(!showMenu)}
           ref={componentRef}
      >
        <h2>{title}</h2>
      </div>

      {showMenu &&
        <MenuDropdown ref={componentRef} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} items={dropdown} onClick={() => setShowMenu(false)}/>
      }
    </section>
  );
};

export default MenuItem;