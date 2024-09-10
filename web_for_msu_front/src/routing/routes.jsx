import {HOME_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE} from "./consts.js";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import Login from "../pages/login/Login.jsx";

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
]

export const authRoutes = []