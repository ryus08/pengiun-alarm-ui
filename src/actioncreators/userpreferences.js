import PenguinClient from '../clients/penguinclient';

const penguinClient = new PenguinClient({
  configName: 'fake', // Can't use most of the methods, but the can search for a config
});

export function setUserPreferences(data) {
  return (dispatch) => {
    return penguinClient
      .setUserPreferences(data)
      .then(() => dispatch({ type: 'USER_PREFERENCES_CHANGED', data }));
  };
}

export function setUserGitProvider(providerName, data) {
  return (dispatch) => {
    return penguinClient
      .setUserGitProvider(providerName, data)
      .then(() => penguinClient.getUserPreferences())
      .then((preferences) => {
        dispatch({
          type: 'USER_PREFERENCES_CHANGED',
          preferences,
        });
      });
  };
}

export function deleteUserGitProvider() {
  return (dispatch) => {
    return penguinClient
      .deleteUserGitProvider()
      .then(() => penguinClient.getUserPreferences())
      .then((preferences) => {
        dispatch({
          type: 'USER_PREFERENCES_CHANGED',
          preferences,
        });
      });
  };
}

export function getUserPreferences() {
  return (dispatch) => {
    return penguinClient
      .getUserPreferences()
      .then((data) => {
        dispatch({
          type: 'USER_PREFERENCES_CHANGED',
          data,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
