import { getAccessToken } from '../auth';

const generateOptions = () => ({
  auth: {
    bearer: getAccessToken(),
  },
});

export function setUserPreferences(data) {
  return (dispatch) => {
    const options = generateOptions();
    options.method = 'PUT';
    options.json = data;
    return fetch(
      'https://customizr.at.cimpress.io/v1/resources/penguin/settings',
      options,
    ).then(() => dispatch({ type: 'USER_PREFERENCES_CHANGED', data }));
  };
}

export function getUserPreferences() {
  return (dispatch) => {
    const options = generateOptions();
    options.method = 'GET';
    return fetch(
      'https://customizr.at.cimpress.io/v1/resources/penguin/settings',
      options,
    )
      .then((response) => {
        dispatch({
          type: 'USER_PREFERENCES_CHANGED',
          data: JSON.parse(response),
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
}
