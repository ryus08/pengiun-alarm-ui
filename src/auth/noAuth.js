export default {
  ensureAuthentication: () => Promise.resolve(),
  isLoggedIn: () => true,
};

export const getAccessToken = () => {
  return 'fakeToken';
};
