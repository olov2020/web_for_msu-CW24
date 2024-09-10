import {useSelector} from 'react-redux'
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes.jsx";
import {NOT_FOUND_ROUTE} from "./consts.js";

const AppRouter = () => {
  const authStatus = useSelector(state => state.user.authStatus);

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