/* eslint-disable no-nested-ternary */
import React from 'react';
import Loading from './loadingpenguin';
import auth from '../auth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.refreshAuth = this.refreshAuth.bind(this);
  }

  UNSAFE_componentWillMount() {
    return this.login();
  }

  refreshAuth() {
    auth.removeToken();
    return this.login();
  }

  login() {
    this.setState({ authorizing: true });

    return auth
      .ensureAuthentication(window.location.pathname + window.location.search)
      .then(() => {
        this.setState({ authorizing: false });
        this.setupTokenRefresh();
      })
      .catch((err) => {
        this.setState({ authorizationError: err });
      });
  }

  render() {
    const { children } = this.props;
    const { authorizing, authorizationError } = this.state;
    return (
      <Loading loading={authorizing}>
        {auth.isLoggedIn() ? (
          children
        ) : authorizationError ? (
          <div>
            Unexpected error encountered.
            {authorizationError.message}
          </div>
        ) : null}
      </Loading>
    );
  }
}

export default App;
