import style from './profile.module.css'
import styleHeader from "../header.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../../../routing/consts.js";
import ButtonSubmit from "../../form/submit/ButtonSubmit.jsx";
import {setNotAuthAction} from "../../../store/UserReducers.js";

// eslint-disable-next-line react/prop-types
const Profile = ({deviceType}) => {

  const location = useLocation();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('photo');
      dispatch(setNotAuthAction());
      navigate(HOME_ROUTE);
      return true;
    } catch (error) {
      alert(`Выход из аккаунта не выполнен, повторите попытку позже.\nОшибка: ${error}`)
    }
  }

  if (location.pathname === '/account' || location.pathname === '/admin') {
    return (
      <ButtonSubmit text='Выйти из аккаунта' onClick={userLogout} type='delete'
                    className={style.logout}
      />
    )
  }

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
    !user.authStatus.includes('none') ?
      (
        <Link to={ACCOUNT_ROUTE} style={{
          display: 'flex',
          alignItems: 'center',
          width: 'auto',
          gap: '0 1rem',
        }}>
          <div>
            <h3>{user.name}</h3>
            <h3>{user.surname}</h3>
          </div>

          {deviceType !== 'phone' &&
              <img className={style.profile__photo}
                   alt='Фотография профиля'
                   src={user.photo}
              />
          }
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