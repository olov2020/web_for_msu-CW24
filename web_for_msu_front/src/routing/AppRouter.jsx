import {useSelector} from 'react-redux'
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {
  adminRoutes, auditorymakerRoutes,
  authRoutes,
  coursemakerRoutes,
  marksmakerRoutes,
  newsmakerRoutes,
  publicRoutes, pupilRoutes
} from "./routes.jsx";
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
      {(authStatus.includes('admin') || authStatus.includes('auditorymaker')) && auditorymakerRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {(authStatus.includes('admin') || authStatus.includes('marksmaker')) && marksmakerRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {(authStatus.includes('admin') || authStatus.includes('coursemaker')) && coursemakerRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {(authStatus.includes('admin') || authStatus.includes('newsmaker')) && newsmakerRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {authStatus.includes('pupil') && pupilRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {authStatus.includes('admin') && adminRoutes.map(({path, Element}) => {
        return <Route key={path} path={path} element={Element}/>
      })}

      {(authStatus.includes('pupil') || authStatus.includes('teacher')) && authRoutes.map(({path, Element}) => {
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