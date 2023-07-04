import { User } from 'oidc-client-ts';

export const oidcConfig = {
  authority: process.env.REACT_APP_AUTHORITY.replaceAll("'", '').trim(),
  client_id: process.env.REACT_APP_CLIENT_ID.replaceAll("'", '').trim(),
  redirect_uri: `${window.location.origin}/app/login`,
  onSigninCallback: ({ state }) => {
    window.history.replaceState({}, document.title, state.pathname);
  },
  onSignoutCallback: () => {
    window.history.replaceState({}, document.title, '/');
  },
};

export const getUserFromStorage = () => {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
};
