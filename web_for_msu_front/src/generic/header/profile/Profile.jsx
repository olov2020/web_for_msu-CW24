import style from './profile.module.css'
import styleHeader from "../header.module.css";
import {getUserInfoByUserId} from "../../../api/userApi.js";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ACCOUNT_ROUTE, LOGIN_ROUTE} from "../../../routing/consts.js";

const Profile = () => {

  const user = useSelector(state => state.user);
  const userInfo = getUserInfoByUserId(user.id);

  return (
    (user.authStatus !== 'none') ?
      (
        <Link to={ACCOUNT_ROUTE}>
          <div>
            <div className={style.profile__info}>
              <h3>{userInfo.name}</h3>
              <h3>{userInfo.surname}</h3>
              <h3>{userInfo.name}</h3>
            </div>

            <img className={style.profile__photo}
                 alt='Фотография профиля'
                 src={userInfo.photo}
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