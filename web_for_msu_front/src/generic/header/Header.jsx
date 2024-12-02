import style from './header.module.css'
import logo from '../../../public/msu_logo.png'
import Profile from "./profile/Profile.jsx";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../routing/consts.js";
import Menu from "./menu/Menu.jsx";
import {useState} from "react";
import Frontend from "./developers/Frontend.jsx";
import Backend from "./developers/Backend.jsx";

const Header = () => {

  const [showFrontend, setShowFrontend] = useState(false);
  const [showBackend, setShowBackend] = useState(false);

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
          <a href='mailto:info@emsch.ru'><p>email</p></a>
          <p onClick={() => setShowFrontend(!showFrontend)}>|</p>
          <a href='https://vk.com/emsch'><p>vk</p></a>
          <p onClick={() => setShowBackend(!showBackend)}>|</p>
          <a href='https://t.me/emsch_msu'><p>tg</p></a>
        </div>
      </div>

      {showFrontend &&
        <Frontend setShowFrontend={setShowFrontend}/>
      }

      {showBackend &&
        <Backend setShowBackend={setShowBackend}/>
      }

      <Menu/>

      <div className={style.profile}>
        <Profile/>
      </div>

    </header>
  );
};

export default Header;