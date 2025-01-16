import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter.jsx";
import Header from "./generic/header/Header.jsx";
import Footer from "./generic/footer/Footer.jsx";
import {useEffect, useState} from "react";
import Frontend from "./generic/header/developers/Frontend.jsx";
import Backend from "./generic/header/developers/Backend.jsx";
import {setAuthFromToken, setNotAuthAction} from "./store/UserReducers.js";
import {useDispatch} from "react-redux";
import PageReloadDetector from "./pages/pageReload/PageReloadDetector.jsx";

const App = () => {

  const [showContext, setShowContext] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(setAuthFromToken(localStorage.getItem('token')));
    } catch {
      dispatch(setNotAuthAction());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <PageReloadDetector/>

      <Header setShowContext={setShowContext}/>

      {showContext === 1 ?
        <Frontend setShowContext={setShowContext}/> :
        showContext === 2 ?
          <Backend setShowContext={setShowContext}/> : <></>}

      <AppRouter setShowContext={setShowContext}/>

      <div style={{marginTop: '5rem',}}></div>

      <Footer/>
    </BrowserRouter>
  )
}

export default App