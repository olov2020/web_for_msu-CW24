import {
  ABOUT_ROUTE,
  ACCOUNT_ROUTE,
  ADD_NEW_COURSE_ROUTE,
  ALL_COURSES_ROUTE,
  COURSES_ITEM_ROUTE,
  CREATE_NEWS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MY_COURSES_ROUTE,
  NEWS_ITEM_ROUTE,
  NEWS_ROUTE,
  NOT_FOUND_ROUTE,
  REGISTRATION_PUPIL_ROUTE,
  REGISTRATION_TEACHER_ROUTE,
  SCHEDULE_ROUTE
} from "./consts.js";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import Login from "../pages/login/Login.jsx";
import RegistrationPupil from "../pages/registration/RegistrationPupil.jsx";
import RegistrationTeacher from "../pages/registration/RegistrationTeacher.jsx";
import Account from "../pages/account/Account.jsx";
import Schedule from "../pages/schedule/Schedule.jsx";
import Courses from "../pages/courses/Courses.jsx";
import AddNewCourse from "../pages/courses/addNewCourse/AddNewCourse.jsx";
import News from "../pages/news/News.jsx";
import NewsCreate from "../pages/news/newsCreate/NewsCreate.jsx";
import NewsItem from "../pages/news/newsItem/NewsItem.jsx";
import CourseItem from "../pages/courses/courseItem/CourseItem.jsx";
import About from "../pages/about/About.jsx";

export const publicRoutes = [
  {
    path: NOT_FOUND_ROUTE,
    Element: <NotFound/>,
  },
  {
    path: HOME_ROUTE,
    Element: <Home/>,
  },
  {
    path: LOGIN_ROUTE,
    Element: <Login/>,
  },
  {
    path: REGISTRATION_PUPIL_ROUTE,
    Element: <RegistrationPupil/>,
  },
  {
    path: REGISTRATION_TEACHER_ROUTE,
    Element: <RegistrationTeacher/>,
  },
  {
    path: ALL_COURSES_ROUTE,
    Element: <Courses/>,
  },
  {
    path: NEWS_ROUTE,
    Element: <News/>,
  },
  {
    path: NEWS_ITEM_ROUTE,
    Element: <NewsItem/>,
  },
  {
    path: COURSES_ITEM_ROUTE,
    Element: <CourseItem/>,
  },
  {
    path: ABOUT_ROUTE,
    Element: <About/>,
  },
]

export const authRoutes = [
  {
    path: ACCOUNT_ROUTE,
    Element: <Account/>,
  },
  {
    path: CREATE_NEWS_ROUTE,
    Element: <NewsCreate/>,
  },
  {
    path: ADD_NEW_COURSE_ROUTE,
    Element: <AddNewCourse/>,
  },
  {
    path: MY_COURSES_ROUTE,
    Element: <Courses/>,
  },
  {
    path: SCHEDULE_ROUTE,
    Element: <Schedule/>,
  },
]