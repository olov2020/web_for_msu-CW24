import {useSelector} from 'react-redux'
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes.jsx";
import {NOT_FOUND_ROUTE} from "./consts.js";
import {useEffect} from "react";

const AppRouter = () => {
  const authStatus = useSelector(state => state.user.authStatus);

  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {authStatus !== 'none' && authRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {publicRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE}/>}/>
    </Routes>
  )
};

export default AppRouter;