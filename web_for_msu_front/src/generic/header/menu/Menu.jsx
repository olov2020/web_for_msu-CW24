import style from "../header.module.css";
import MenuItem from "./menuItem/MenuItem.jsx";
import {
  ABOUT_ROUTE,
  ADD_NEW_COURSE_ROUTE,
  ALL_COURSES_ROUTE, AUDITORY_ROUTE,
  COURSES_SELECT_ROUTE,
  CREATE_NEWS_ROUTE, EVENTS_CONTEST_SCIENTIFIC_WORKS_ROUTE,
  EVENTS_OPEN_CHAMPIONSHIP_ROUTE, EVENTS_RESIDENTIAL_SCHOOL_ROUTE, EVENTS_SUMMER_CAMP_ROUTE, EVENTS_SUMMER_SCHOOL_ROUTE,
  EVENTS_TESTS_ROUTE,
  MARKS_ROUTE,
  MY_COURSES_ROUTE,
  NEWS_ROUTE,
  SCHEDULE_ROUTE, TEACHERS_ROUTE
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
          title: 'Все курсы', link: ALL_COURSES_ROUTE, id: 0,
        },
      ],
    },
    {
      title: 'События', id: 2,
      dropdown: [
        {
          title: 'Вступительные испытания', link: EVENTS_TESTS_ROUTE, id: 0,
        },
        {
          title: 'Открытый Чемпионат', link: EVENTS_OPEN_CHAMPIONSHIP_ROUTE, id: 1,
        },
        {
          title: 'Конкурс Научных Работ', link: EVENTS_CONTEST_SCIENTIFIC_WORKS_ROUTE, id: 2,
        },
        {
          title: 'Выездная Школа', link: EVENTS_RESIDENTIAL_SCHOOL_ROUTE, id: 3,
        },
        {
          title: 'Летняя Школа', link: EVENTS_SUMMER_SCHOOL_ROUTE, id: 4,
        },
        {
          title: 'Летний Лагерь', link: EVENTS_SUMMER_CAMP_ROUTE, id: 5,
        },
      ],
    },
    {
      title: 'Школа',
      id: 3,
      dropdown: [
        {
          title: 'Об ЭМШ', link: ABOUT_ROUTE, id: 0,
        },
        {
          title: 'Преподаватели и контакты', link: TEACHERS_ROUTE, id: 1,
        },
      ],
    },
  ]

  if (userStatus.includes('pupil') || userStatus.includes('teacher')) {
    menu[1].dropdown.push({
      title: 'Расписание', link: SCHEDULE_ROUTE, id: menu[1].length,
    })
    menu[1].dropdown.push({
      title: 'Мои Курсы', link: MY_COURSES_ROUTE, id: menu[1].length,
    })
  }

  if (userStatus.includes('pupil') && !userStatus.includes('retired')) {
    menu[1].dropdown.push({
      title: 'Выбор курсов', link: COURSES_SELECT_ROUTE, id: menu[1].length,
    })
  }

  if (userStatus.includes('newsmaker') || userStatus.includes('admin')) {
    menu[0].dropdown.push({
      title: 'Добавить новость', link: CREATE_NEWS_ROUTE, id: menu[0].length,
    })
  }

  if (userStatus.includes('admin') || userStatus.includes('coursemaker')) {
    menu[1].dropdown.push({
      title: 'Добавить новый курс', link: ADD_NEW_COURSE_ROUTE, id: menu[1].length,
    })
  }

  if (userStatus.includes('admin') || userStatus.includes('auditorymaker')) {
    menu[1].dropdown.push({
      title: 'Назначить аудитории', link: AUDITORY_ROUTE, id: menu[1].length,
    })
  }

  if (userStatus.includes('admin') || userStatus.includes('marksmaker')) {
    menu[1].dropdown.push({
      title: 'Все ведомости', link: MARKS_ROUTE, id: menu[1].length,
    })
  }


  return (
    <nav className={style.menu}>
      {menu.map(menuItem => (
        // eslint-disable-next-line react/jsx-key
        <MenuItem id={menuItem.id} title={menuItem.title} dropdown={menuItem.dropdown}/>
      ))}
    </nav>
  );
};

export default Menu;