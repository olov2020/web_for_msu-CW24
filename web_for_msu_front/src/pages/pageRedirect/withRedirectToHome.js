import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../routing/consts.js";

const withRedirectToHome = (WrappedComponent) => {
  const WithRedirect = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (props.showContext === null) {
        navigate(HOME_ROUTE);
      }
    }, [props.showContext, history]);

    return <WrappedComponent {...props} />;
  };

  WithRedirect.propTypes = {
    showContext: PropTypes.any,
  };

  return WithRedirect;
};

export default withRedirectToHome;
