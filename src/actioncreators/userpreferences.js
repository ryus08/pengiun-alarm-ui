import { getAccessToken } from '../auth';

const generateOptions = () => ({
  auth: {
    bearer: getAccessToken(),
  },
});

// TODO: some route on the server for this. Probably better than configuring in the UI
let userPreferences = {};

export function setUserPreferences(data) {
  return (dispatch) => {
    userPreferences = data;
    dispatch({ type: 'USER_PREFERENCES_CHANGED', data });
    // const options = generateOptions();
    // options.method = 'PUT';
    // options.json = data;
    // return fetch(
    //   'https://customizr.at.cimpress.io/v1/resources/penguin/settings',
    //   options,
    // ).then(() => dispatch({ type: 'USER_PREFERENCES_CHANGED', data }));
  };
}

export function getUserPreferences() {
  return (dispatch) => {
    dispatch({
      type: 'USER_PREFERENCES_CHANGED',
      data: userPreferences,
    });
    // const options = generateOptions();
    // options.method = 'GET';
    // return fetch(
    //   'https://customizr.at.cimpress.io/v1/resources/penguin/settings',
    //   options,
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch({
    //       type: 'USER_PREFERENCES_CHANGED',
    //       data,
    //     });
    //   })
    //   .catch((error) => {
    //     // eslint-disable-next-line no-console
    //     console.log(error);
    //   });
  };
}
