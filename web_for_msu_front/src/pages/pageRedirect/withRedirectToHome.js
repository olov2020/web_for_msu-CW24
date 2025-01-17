import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const withRedirectToHome = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const history = useHistory();

    useEffect(() => {
      // eslint-disable-next-line react/prop-types
      if (props.showContext === null) {
        history.push('/');
      }
      // eslint-disable-next-line react/prop-types
    }, [props.showContext, history]);

    return <WrappedComponent {...props} />;
  };
};

export default withRedirectToHome;
