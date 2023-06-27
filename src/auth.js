import configuredAuth, {
  getAccessToken as configuredGetAccessToken,
} from './auth/noAuth';

const auth = configuredAuth;
export default auth;

export const getAccessToken = configuredGetAccessToken;
