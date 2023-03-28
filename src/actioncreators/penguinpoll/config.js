function pollPenguinConfig({ penguinClient }) {
  return (dispatch) => {
    const refresh = () =>
      penguinClient
        .getConfig()
        .then((configuration) => {
          dispatch({
            type: 'CONFIGURATION_LOADED',
            configuration,
            name: penguinClient.configName,
          });
        })
        // go check once a minute
        .catch((e) => {
          dispatch({ type: 'CONFIGURATION_ERROR', error: e });
        })
        .then(() => setTimeout(refresh, 60000));
    refresh();
  };
}

export default pollPenguinConfig;
