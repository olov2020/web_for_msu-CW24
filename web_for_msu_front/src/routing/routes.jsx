import {HOME_ROUTE, NOT_FOUND_ROUTE} from "./consts.js";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";

export const publicRoutes = [
  {
    path: NOT_FOUND_ROUTE,
    Element: <NotFound/>,
  },
  {
    path: HOME_ROUTE,
    Element: <Home/>,
  },
]

export const authRoutes = []