import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter.jsx";
import Header from "./generic/header/Header.jsx";
import Footer from "./generic/footer/Footer.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setAuthFromToken, setNotAuthAction} from "./store/UserReducers.js";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setAuthFromToken(token));
    } else {
      dispatch(setNotAuthAction());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header/>

      <AppRouter/>

      <div style={{marginTop: '5rem',}}></div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App