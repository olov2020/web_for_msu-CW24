import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  REGISTRATION_PUPIL_ROUTE,
  REGISTRATION_TEACHER_ROUTE
} from "./consts.js";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import Login from "../pages/login/Login.jsx";
import RegistrationPupil from "../pages/registration/RegistrationPupil.jsx";
import RegistrationTeacher from "../pages/registration/RegistrationTeacher.jsx";

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
]

export const authRoutes = []