import style from "../header.module.css";
import MenuItem from "./menuItem/MenuItem.jsx";
import {
  ADD_NEW_COURSE_ROUTE,
  ALL_COURSES_ROUTE, CHANGE_COURSE_ROUTE, CREATE_NEWS_ROUTE,
  MY_COURSES_ROUTE,
  NEWS_ROUTE, NOT_FOUND_ROUTE,
  SCHEDULE_ROUTE
} from "../../../routing/consts.js";
import {useSelector} from "react-redux";

const Menu = () => {

  const userStatus = useSelector(state => state.user.authStatus);

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
          title: 'Мои Курсы', link: MY_COURSES_ROUTE, id: 1,
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
      ],
    },
  ]

  if (userStatus.includes('newsmaker') || userStatus.includes('admin')) {
    menu[0].dropdown.push({
      title: 'Добавить новость', link: CREATE_NEWS_ROUTE, id: menu[0].length,
    })
  }

  if (userStatus.includes('admin')) {
    menu[1].dropdown.push({
      title: 'Добавить новый курс', link: ADD_NEW_COURSE_ROUTE, id: menu[1].length,
    })
    menu[1].dropdown.push({
      title: 'Изменить курс', link: CHANGE_COURSE_ROUTE, id: menu[1].length,
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