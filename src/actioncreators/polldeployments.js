import { get as _get } from 'lodash';
import poller from '../pollers/deploymentpoller';

function pollDeployments({ gitLabToken }) {
  return (dispatch, getState) => {
    poller({
      config: () => {
        const config = _get(getState(), 'configuration.gitlab', {});
        config.token = gitLabToken;
        config.refreshRate = _get(config, 'refreshRate', 60000);
        return config;
      },
      update: (allDeployments, offset) =>
        dispatch({
          allDeployments,
          offset,
          type: 'DEPLOYMENTS_UPDATED',
        }),
    });
  };
}

export default pollDeployments;
