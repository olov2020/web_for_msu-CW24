import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {HOME_ROUTE} from "../../routing/consts.js";

const withRedirectToHome = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const history = useHistory();

    useEffect(() => {
      if (window.location.pathname === HOME_ROUTE) {
        history.push('/');
      }
    }, [history]);

    return <WrappedComponent {...props} />;
  };
};

export default withRedirectToHome;