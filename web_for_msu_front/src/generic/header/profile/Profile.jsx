import style from './profile.module.css'
import styleHeader from "../header.module.css";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE} from "../../../routing/consts.js";

const Profile = () => {

  const user = useSelector(state => state.user);

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
          <div>
            <div className={style.profile__info}>
              <h3>{user.name}</h3>
              <h3>{user.surname}</h3>
              <h3>{user.name}</h3>
            </div>

            <img className={style.profile__photo}
                 alt='Фотография профиля'
                 src={user.photo}
            />
          </div>
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