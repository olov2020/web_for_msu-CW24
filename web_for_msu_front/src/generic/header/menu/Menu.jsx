import style from "../header.module.css";
import MenuItem from "./menuItem/MenuItem.jsx";
import {
  ADD_NEW_COURSE_ROUTE,
  ALL_COURSES_ROUTE,
  MY_COURSES_ROUTE,
  NEWS_ROUTE, NOT_FOUND_ROUTE,
  SCHEDULE_ROUTE
} from "../../../routing/consts.js";
import {useSelector} from "react-redux";

const Menu = () => {

  const user = useSelector((state) => state.user);

  const menu = [
    {
      title: 'Новости', id: 0,
      dropdown: [
        {
          title: 'Новости', link: NEWS_ROUTE, id: 0,
        },
      ],
    },
    {
      title: 'Курсы', id: 1,
      dropdown: [
        {
          title: 'Расписание', link: SCHEDULE_ROUTE, id: 0,
        },
        {
          title: 'Мои курсы', link: MY_COURSES_ROUTE, id: 1,
        },
        {
          title: 'Все курсы', link: ALL_COURSES_ROUTE, id: 2,
        },
      ],
    },
    {
      title: 'События', id: 2,
      dropdown: [
        {
          title: 'Вступительные испытания', link: NOT_FOUND_ROUTE, id: 0,
        },
        {
          title: 'Открытый Чемпионат', link: NOT_FOUND_ROUTE, id: 1,
        },
        {
          title: 'Конкурс Научных Работ', link: NOT_FOUND_ROUTE, id: 2,
        },
        {
          title: 'Выездная Школа', link: NOT_FOUND_ROUTE, id: 3,
        },
        {
          title: 'Летняя Школа', link: NOT_FOUND_ROUTE, id: 4,
        },
        {
          title: 'Летний Лагерь', link: NOT_FOUND_ROUTE, id: 5,
        },
      ],
    },
    {
      title: 'Сообщество',
      id: 3,
      dropdown: [
        {
          title: 'Об ЭМШ', link: NOT_FOUND_ROUTE, id: 0,
        },
        {
          title: 'Преподаватели и дирекция', link: NOT_FOUND_ROUTE, id: 1,
        },
        {
          title: 'Список учащихся', link: NOT_FOUND_ROUTE, id: 2,
        },
        {
          title: 'Архив событий', link: NOT_FOUND_ROUTE, id: 3,
        },
      ],
    },
  ]

  if (user.authStatus === 'admin') {
    menu[1].dropdown.push({
      title: 'Добавить новый курс', link: ADD_NEW_COURSE_ROUTE, id: 3,
    })
  }

  return (
    <nav className={style.menu}>
      {menu.map(menuItem => (
        <MenuItem key={menuItem.id} title={menuItem.title} dropdown={menuItem.dropdown} />
      ))}
    </nav>
  );
};

export default Menu;