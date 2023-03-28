import penguinPoller from '../../pollers/penguinpoller';

function pollPenguinMergeStats({ penguinClient }) {
  return (dispatch, getState) => {
    penguinPoller({
      config: () => ({
        penguinClient,
        type: 'merges',
        refreshRate: 60000,
      }),
      update: (data) => {
        const username = getState().userPreferences.gitLabUsername;
        dispatch({
          type: 'MERGE_STATS_UPDATED',
          merges: data.merges,
          username,
        });
      },
    });
  };
}

export default pollPenguinMergeStats;
