/* eslint-disable camelcase */
import { User } from 'oidc-client-ts';

export const oidcConfig = {
  authority: process.env.REACT_APP_AUTHORITY.replaceAll("'", '').trim(),
  client_id: process.env.REACT_APP_CLIENT_ID.replaceAll("'", '').trim(),
  redirect_uri: `${window.location.origin}/app/login`,
  onSigninCallback: ({ state }) => {
    window.history.replaceState({}, document.title, state.pathname);
  },
  // TODO: should this be onRemoveUser?
  onSignoutCallback: () => {
    window.history.replaceState({}, document.title, '/');
  },
  extraQueryParams: {
    audience: 'PenguinAlarm',
  },
  scope: process.env.REACT_APP_AUTHN_SCOPE.replaceAll("'", '').trim(),
};

export const gitProviders = {};

const addGitProviderConfigIfDefined = (providers, gitProviderName, color) => {
  const authority = (
    process.env[`REACT_APP_${gitProviderName.toUpperCase()}_AUTHORITY`] || ''
  )
    .replaceAll("'", '')
    .trim();
  const client_id = (
    process.env[`REACT_APP_${gitProviderName.toUpperCase()}_CLIENT_ID`] || ''
  )
    .replaceAll("'", '')
    .trim();

  if (authority && client_id) {
    providers[gitProviderName] = {
      color,
      oidcConfig: {
        authority,
        client_id,
        redirect_uri: `${window.location.origin}/app/login/${gitProviderName}`,
        onSigninCallback: ({ state }) => {
          window.history.replaceState({}, document.title, state.pathname);
        },
        scope: 'read_api',
      },
    };
  }
};
addGitProviderConfigIfDefined(gitProviders, 'gitlab', 'orange');
addGitProviderConfigIfDefined(gitProviders, 'github', 'purple');
addGitProviderConfigIfDefined(gitProviders, 'bitbucket', 'blue');

export const getUserFromStorage = () => {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
};
