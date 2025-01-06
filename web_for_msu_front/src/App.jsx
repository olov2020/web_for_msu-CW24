import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter.jsx";
import Header from "./generic/header/Header.jsx";
import Footer from "./generic/footer/Footer.jsx";
import {useState} from "react";
import Frontend from "./generic/header/developers/Frontend.jsx";
import Backend from "./generic/header/developers/Backend.jsx";

const App = () => {

  const [showContext, setShowContext] = useState(0);

  return (
    <BrowserRouter>
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