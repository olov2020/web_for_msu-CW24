import style from './header.module.css'
import logo from '../../../public/msu_logo.png'
import Profile from "./profile/Profile.jsx";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../routing/consts.js";
import Menu from "./menu/Menu.jsx";

const Header = () => {
  return (
    <header className={style.header}>

      <div className={style.logo}>
        <Link to={HOME_ROUTE}>
          <img className={style.logo__img}
               alt='Логотип'
               src={logo}
          />
        </Link>

        <div className={style.contacts}>
          <p>email</p>
          <p>|</p>
          <p>vk</p>
          <p>|</p>
          <a href='https://t.me/emsch_msu'><p>tg</p></a>
        </div>
      </div>

      <Menu/>

      <div className={style.profile}>
        <Profile/>
      </div>

    </header>
  );
};

export default Header;