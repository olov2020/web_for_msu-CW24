import style from './header.module.css'
import logo from '../../../public/msu_logo.png'
import Profile from "./profile/Profile.jsx";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../routing/consts.js";
import Menu from "./menu/Menu.jsx";
import {useEffect, useState} from "react";
import PhoneMenu from "./menu/PhoneMenu.jsx";

// eslint-disable-next-line react/prop-types
const Header = ({setShowContext}) => {

  const getDeviceType = () => {
    const userAgent = window.navigator.userAgent;
    if (/mobile/i.test(userAgent) || /android/i.test(userAgent)) {
      return 'phone';
    } else if (/tablet/i.test(userAgent) || /ipad/i.test(userAgent)) {
      return 'tablet';
    } else {
      return 'computer';
    }
  };

  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);

  return (
    <header className={style.header}>

      {deviceType === 'phone' ?
        <Link to={HOME_ROUTE} style={{
          width: '25%',
        }}>
          <img className={style.logo__img}
               alt='Логотип'
               src={logo}
          />
        </Link> :
        <div className={style.logo}>
          <Link to={HOME_ROUTE}>
            <img className={style.logo__img}
                 alt='Логотип'
                 src={logo}
            />
          </Link>

          <div className={style.contacts}>
            <a href='mailto:info@emsch.ru'><p>email</p></a>
            <p onClick={() => setShowContext(1)} style={{cursor: 'pointer'}}>|</p>
            <a href='https://vk.com/emsch'><p>vk</p></a>
            <p onClick={() => setShowContext(2)} style={{cursor: 'pointer'}}>|</p>
            <a href='https://t.me/emsch_msu'><p>tg</p></a>
          </div>
        </div>
      }

      {deviceType === 'phone' ?
        <PhoneMenu/> :
        <Menu/>
      }

      <div className={style.profile}>
        <Profile deviceType={deviceType}/>
      </div>

    </header>
  );
};

export default Header;