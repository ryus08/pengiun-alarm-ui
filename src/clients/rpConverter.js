export default {
  generateOptions: (rpOptions = {}) => {
    const headers = {
      ...rpOptions.headers,
    };
    let body;
    if (rpOptions.json) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      body = JSON.stringify(rpOptions.json);
    }
    return {
      ...rpOptions,
      headers,
      body,
    };
  },
};
