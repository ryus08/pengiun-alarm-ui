import { get as _get } from 'lodash';
import poller from '../pollers/newrelicpoller';

function pollNewRelic() {
  return (dispatch, getState) => {
    poller({
      config: () => {
        const config = _get(getState(), 'configuration.newrelic', {});
        config.apiKey = _get(getState(), 'userPreferences.nrApiKey');
        config.refreshRate = _get(config, 'refreshRate', 30000);
        return config;
      },
      update: (violations) =>
        dispatch({ type: 'NEW_RELIC_UPDATED', violations }),
      err: () => dispatch({ type: 'NEW_RELIC_ERROR' }),
    });
  };
}

export default pollNewRelic;
