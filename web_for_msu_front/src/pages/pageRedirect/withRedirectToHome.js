import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

const withRedirectToHome = (WrappedComponent) => {
  const WithRedirect = (props) => {
    const history = useHistory();

    useEffect(() => {
      if (props.showContext === null) {
        history.push('/');
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
