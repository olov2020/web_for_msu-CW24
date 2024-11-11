import {
  ACCOUNT_ROUTE, ADD_NEW_COURSE_ROUTE, ALL_COURSES_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE, MY_COURSES_ROUTE, NEWS_ROUTE,
  NOT_FOUND_ROUTE,
  REGISTRATION_PUPIL_ROUTE,
  REGISTRATION_TEACHER_ROUTE, SCHEDULE_ROUTE
} from "./consts.js";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import Login from "../pages/login/Login.jsx";
import RegistrationPupil from "../pages/registration/RegistrationPupil.jsx";
import RegistrationTeacher from "../pages/registration/RegistrationTeacher.jsx";
import Account from "../pages/account/Account.jsx";
import Schedule from "../pages/schedule/Schedule.jsx";
import MyCourses from "../pages/courses/myCourses/MyCourses.jsx";
import AllCourses from "../pages/courses/allCourses/AllCourses.jsx";
import AddNewCourse from "../pages/courses/addNewCourse/AddNewCourse.jsx";
import News from "../pages/news/News.jsx";

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
    path: ACCOUNT_ROUTE,
    Element: <Account/>,
  },
  {
    path: SCHEDULE_ROUTE,
    Element: <Schedule/>,
  },
  {
    path: MY_COURSES_ROUTE,
    Element: <MyCourses/>,
  },
  {
    path: ALL_COURSES_ROUTE,
    Element: <AllCourses/>,
  },
  {
    path: ADD_NEW_COURSE_ROUTE,
    Element: <AddNewCourse/>,
  },
  {
    path: NEWS_ROUTE,
    Element: <News/>,
  },
]

export const authRoutes = []