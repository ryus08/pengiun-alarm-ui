import penguinPoller from '../../pollers/penguinpoller';

function pollPenguinDeployments({ penguinClient }) {
  return (dispatch) => {
    penguinPoller({
      config: () => ({
        penguinClient,
        type: 'deployments',
        refreshRate: 60000,
      }),
      update: (data) => {
        dispatch({
          type: 'DEPLOYMENT_STATS_UPDATED',
          deployments: data.deployments.deployments,
          projectStats: data.deployments.projectStats,
          history: data.history,
        });
      },
    });
  };
}

export default pollPenguinDeployments;
