import penguinPoller from '../../pollers/activitypoller';

function pollMergeActivity({ penguinClient }) {
  return (dispatch) => {
    penguinPoller({
      config: () => ({
        pollMethod: () => penguinClient.getMergeActivity(),
        refreshRate: 1200000,
      }),
      update: ({ data }) => {
        dispatch({ type: 'MERGE_ACTIVITY_UPDATED', merges: data });
      },
    });
  };
}

export default pollMergeActivity;
