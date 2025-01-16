import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {HOME_ROUTE} from "../../routing/consts.js";

const PageReloadDetector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isHardReload = sessionStorage.getItem('hardReload') !== localStorage.getItem('hardReload');

    if (isHardReload) {
      navigate(HOME_ROUTE);
      localStorage.setItem('hardReload', sessionStorage.getItem('hardReload'));
    } else {
      const uniqueId = Date.now().toString();
      sessionStorage.setItem('hardReload', uniqueId);
      localStorage.setItem('hardReload', uniqueId);
    }
  }, [navigate]);

  return null;
};

export default PageReloadDetector;