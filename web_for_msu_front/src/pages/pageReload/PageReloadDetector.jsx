import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {HOME_ROUTE} from "../../routing/consts.js";

const PageReloadDetector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log('Page is about to be unloaded');
      event.returnValue = 'Are you sure you want to leave?';
    };

    const handleUnload = () => {
      console.log('Page is being unloaded');
      navigate(HOME_ROUTE);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [navigate]);

  return null;
};

export default PageReloadDetector;