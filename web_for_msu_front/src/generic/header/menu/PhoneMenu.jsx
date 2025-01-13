import style from './menu.module.css';
import {useState} from "react";
import {Menu} from "antd";

const PhoneMenu = () => {

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
        <Menu/>
      }
    </section>
  );
};

export default PhoneMenu;