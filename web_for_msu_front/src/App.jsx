import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter.jsx";
import {useEffect, useState} from "react";
import Loading from "./pages/loading/Loading.jsx";
import Header from "./generic/header/Header.jsx";
import Footer from "./generic/footer/Footer.jsx";

const App = () => {

  /*const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async operation (replace with your actual loading logic)
    const loadingDelay = 1500; // 1.5 seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, loadingDelay);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Run the effect only once on mount

  if (isLoading) {
    return <Loading/>
  }*/

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