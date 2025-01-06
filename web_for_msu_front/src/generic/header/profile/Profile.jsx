import style from './profile.module.css'
import styleHeader from "../header.module.css";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE} from "../../../routing/consts.js";
import {useEffect, useRef, useState} from "react";
import {getUserData} from "../../../api/userApi.js";

const Profile = () => {

  const location = useLocation();
  const user = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState({});
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const getUserDataFunc = async () => {
      const data = await getUserData();
      setUserInfo(data);
    };

    if (prevPathnameRef.current !== location.pathname) {
      getUserDataFunc();
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  if (user.authStatus.includes('admin')) {
    return (
      <div className={styleHeader.menu__item}>
        <Link to={ADMIN_ROUTE}>
          <div className={styleHeader.menu__name}>
            <h2>Админ панель</h2>
          </div>
        </Link>
      </div>
    )
  }

  return (
    (!user.authStatus.includes('none')) ?
      (
        <Link to={ACCOUNT_ROUTE}>
          <div className={style.profile__info}>
            <h3>{userInfo.name}</h3>
            <h3>{userInfo.surname}</h3>
          </div>

          <img className={style.profile__photo}
               alt='Фотография профиля'
               src={userInfo.photo}
          />
        </Link>) :
      (
        <div className={styleHeader.menu__item}>
          <Link to={LOGIN_ROUTE}>
            <div className={styleHeader.menu__name}>
              <h2>Войти</h2>
            </div>
          </Link>
        </div>
      )
  );
};

export default Profile;