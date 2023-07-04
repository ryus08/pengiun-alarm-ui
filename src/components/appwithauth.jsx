/* eslint-disable no-nested-ternary */
import React from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
import Loading from './loadingpenguin';

const App = ({ children }) => {
  const auth = useAuth();

  // automatically sign-in
  React.useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      auth.signinRedirect({
        state: {
          pathname: window.location.pathname,
        },
      });
    }
  }, [auth]);

  let body = null;
  if (auth.isAuthenticated) {
    body = children;
  } else if (auth.error) {
    body = (
      <div>
        Unexpected error encountered.
        {auth.error.message}
      </div>
    );
  } else if (auth.isLoading) {
    <div>{auth.activeNavigator}</div>;
  }

  return <Loading loading={auth.isLoading}>{body}</Loading>;
};

export default App;
