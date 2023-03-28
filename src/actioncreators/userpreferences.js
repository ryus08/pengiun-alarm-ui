import rp from 'request-promise';
import { getAccessToken } from '../auth';

const generateOptions = (uri) => ({
  uri,
  auth: {
    bearer: getAccessToken(),
  },
});

export function setUserPreferences(data) {
  return (dispatch) => {
    const options = generateOptions(
      'https://customizr.at.cimpress.io/v1/resources/penguin/settings',
    );
    options.method = 'PUT';
    options.json = data;
    return rp(options).then(() =>
      dispatch({ type: 'USER_PREFERENCES_CHANGED', data }),
    );
  };
}

export function getUserPreferences() {
  return (dispatch) => {
    const options = generateOptions(
      'https://customizr.at.cimpress.io/v1/resources/penguin/settings',
    );
    options.method = 'GET';
    return rp(options)
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
