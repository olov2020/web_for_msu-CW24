import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter.jsx";
import {useEffect, useState} from "react";
import Loading from "./pages/loading/Loading.jsx";
import Header from "./generic/header/Header.jsx";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async operation (replace with your actual loading logic)
    const loadingDelay = 1500; // 2 seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, loadingDelay);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Run the effect only once on mount

  if (isLoading) {
    return <Loading/>
  }

  return (
    <BrowserRouter>
      <Header/>

      <AppRouter/>
    </BrowserRouter>
  )
}

export default App