import { centralizedAuth, UserMetadata } from '@cimpress/simple-auth-wrapper';

export const CLIENT_ID = '8x49mJ9tKezGvTbjvqU9IgfhtjmByjrN';

// eslint-disable-next-line new-cap
const auth = new centralizedAuth({
  clientID: CLIENT_ID,
  redirectRoute: '/',
});

export default auth;

export const getAccessToken = () => {
  const userMetadata = new UserMetadata(auth);
  return userMetadata.auth.getAccessToken();
};
