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
