import YAML from 'yamljs';

function pollConfig({ configUrl }) {
  return (dispatch) => {
    const refresh = () =>
      fetch(configUrl)
        .then((response) => YAML.parse(response))
        .then((configuration) => {
          dispatch({ type: 'CONFIGURATION_LOADED', configuration });
        })
        // go check once a minute
        .catch((e) => {
          dispatch({ type: 'CONFIGURATION_ERROR', error: e });
        })
        .then(() => setTimeout(refresh, 60000));
    refresh();
  };
}

export default pollConfig;
