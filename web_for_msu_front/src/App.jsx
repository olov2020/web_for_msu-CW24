import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter.jsx";
import Header from "./generic/header/Header.jsx";
import Footer from "./generic/footer/Footer.jsx";

const App = () => {

  /*useEffect(() => {
    const getRoles = async () => {
      const data = await getAllRoles();
      console.log(data);
    }

    getRoles();
  }, []);*/

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

  /*const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const checkToken = async () => {
      if (!accessToken || !refreshToken){
        return; // No tokens yet, wait for login
      }
      try {
        setLoading(true);
        const response = await $host.get('/api/protected', { //Example protected route
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) { //Unauthorized - Token expired
          await refreshTokenLogic();
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }
    checkToken();
  }, [accessToken, refreshToken]);

  const refreshTokenLogic = async () => {
    try {
      const response = await axios.post(REFRESH_ENDPOINT, { refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
    } catch (error) {
      setError('Refresh token failed. Please log in again.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAccessToken(null);
      setRefreshToken(null);
      //Redirect to login
    }
  };*/

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