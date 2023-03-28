/* eslint-disable no-nested-ternary */
import React from 'react';
import { decode } from 'jsonwebtoken';
import Loading from './loadingpenguin';
import auth, { getAccessToken } from '../auth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.refreshAuth = this.refreshAuth.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    return auth.isLoggedIn() ? this.setupTokenRefresh() : this.login();
  }

  setupTokenRefresh() {
    const accessToken = getAccessToken();
    const expireTimestamp = decode(accessToken).exp * 1000; // jwt exp is in seconds
    const msTillExpire = expireTimestamp - Date.now();

    return setTimeout(this.refreshAuth, msTillExpire - msTillExpire * 0.25);
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
