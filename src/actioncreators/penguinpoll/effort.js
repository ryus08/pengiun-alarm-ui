import penguinPoller from '../../pollers/activitypoller';

function pollProjectEffort({ penguinClient }) {
  return (dispatch) => {
    penguinPoller({
      config: () => ({
        pollMethod: () => penguinClient.getProjectEffort(),
        refreshRate: 1200000,
      }),
      update: ({ data }) => {
        dispatch({ type: 'PROJECT_EFFORT_UPDATED', effort: data });
      },
    });
  };
}

export default pollProjectEffort;
