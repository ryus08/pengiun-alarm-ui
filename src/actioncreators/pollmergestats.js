import { get as _get } from 'lodash';
import gitlabMergePoller from '../pollers/mergeparticipationpoller';

function pollMergeStats({ gitLabToken }) {
  return (dispatch, getState) => {
    gitlabMergePoller({
      config: () => {
        const config = _get(getState(), 'configuration.gitlab', {});
        config.token = gitLabToken;
        config.refreshRate = _get(config, 'refreshRate', 60000);
        return config;
      },
      update: (data) => {
        const username = getState().userPreferences.gitLabUsername;
        dispatch({ type: 'MERGES_UPDATED', data, username });
      },
    });
  };
}

export default pollMergeStats;
