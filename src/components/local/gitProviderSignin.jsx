import { Menu, Icon } from 'semantic-ui-react';
import React from 'react';
import { useAuth, AuthProvider } from 'react-oidc-context';
import { gitProviders } from '../../auth';

const AuthLogin = ({ providerName, providerColor }) => {
  const auth = useAuth();
  const color = auth.isAuthenticated ? providerColor : null;
  const onClick = () =>
    auth.isAuthenticated
      ? auth.removeUser({
          state: {
            pathname: window.location.pathname,
          },
        })
      : auth.signinRedirect({
          state: {
            pathname: window.location.pathname,
          },
        });
  return (
    <Menu.Item name={providerName} onClick={onClick}>
      <Icon name={providerName} color={color} />
    </Menu.Item>
  );
};

const GitProviderSignin = (props) => {
  const { gitProvider, setUserGitProvider, deleteUserGitProvider } = props;
  const buildItem = (providerName) => {
    const { oidcConfig, color } = gitProviders[providerName];
    const skipSigninCallback =
      new URL(oidcConfig.redirect_uri).pathname !== window.location.pathname;
    return (
      <AuthProvider
        key={providerName}
        {...oidcConfig}
        skipSigninCallback={skipSigninCallback}
        onSigninCallback={(result) => {
          const { state } = result;
          const userData = { ...result };
          delete userData.state;
          setUserGitProvider(providerName, userData);
          oidcConfig.onSigninCallback({ state });
        }}
        onRemoveUser={() => {
          deleteUserGitProvider();
        }}
      >
        <AuthLogin providerName={providerName} providerColor={color} />
      </AuthProvider>
    );
  };

  const loginFor = Object.entries(gitProviders).find(([, v]) => {
    return (
      new URL(v.oidcConfig.redirect_uri).pathname === window.location.pathname
    );
  });

  if (loginFor || gitProvider) {
    const [providerName] = loginFor || [gitProvider];
    return buildItem(providerName);
  }
  return Object.keys(gitProviders).map((key) => buildItem(key));
};

export default GitProviderSignin;
