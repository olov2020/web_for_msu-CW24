import style from './header.module.css'
import logo from '../../../public/msu_logo.png'
import Profile from "./profile/Profile.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import {
  ADD_NEW_COURSE_ROUTE,
  ALL_COURSES_ROUTE,
  HOME_ROUTE,
  MY_COURSES_ROUTE,
  SCHEDULE_ROUTE
} from "../../routing/consts.js";

const Header = () => {

  const menu = [
    'Новости',
    'Курсы',
    'События',
    'Сообщество',
  ]

  const menuItems = [
    [],
    [
      'Расписание',
      'Мои курсы',
      'Все курсы',
      'Добавить новый курс'
    ],
    [
      'Вступительные испытания',
      'Открытый Чемпионат',
      'Конкурс Научных Работ',
      'Выездная Школа',
      'Летняя Школа',
      'Летний Лагерь',
    ],
    [
      'Об ЭМШ',
      'Преподаватели и дирекция',
      'Список учащихся',
      'Архив событий',
    ],
  ]

  const menuItemsLinks = [
    [],
    [
      SCHEDULE_ROUTE,
      MY_COURSES_ROUTE,
      ALL_COURSES_ROUTE,
      ADD_NEW_COURSE_ROUTE,
    ],
    [],
    []
  ]

  const [showMenu, setShowMenu] = useState(-1);

  return (
    <div className={style.header}>

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
          <p>tg</p>
        </div>
      </div>

      <div className={style.menu}>
        {menu.map((item, index) => (
          <div className={style.menu__item} key={index}>
            <div className={style.menu__name}
                 onMouseEnter={() => setShowMenu(index)}
                 onMouseLeave={() => setShowMenu(-1)}
            >
              <h2>{item}</h2>
            </div>

            <div className={style.menu__dropdownList}
                 style={index === showMenu ? {display: 'block'} : {display: 'none'}}
                 onMouseEnter={() => setShowMenu(index)}
                 onMouseLeave={() => setShowMenu(-1)}
            >
              {menuItems[index].map((item, index2) => (
                <Link to={menuItemsLinks[index][index2]} className={style.dropdownList__item}
                     key={index2}
                >
                  <h3>{item}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={style.profile}>
        <Profile/>
      </div>

    </div>
  );
};

export default Header;