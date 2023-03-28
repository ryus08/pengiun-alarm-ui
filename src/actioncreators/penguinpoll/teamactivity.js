import penguinPoller from '../../pollers/activitypoller';

function pollTeamActivity({ penguinClient }) {
  return (dispatch) => {
    penguinPoller({
      config: () => ({
        pollMethod: () => penguinClient.getTeamActivity(),
        refreshRate: 1200000,
      }),
      update: ({ data }) => {
        dispatch({ type: 'TEAM_ACTIVITY_UPDATED', teamData: data });
      },
    });
  };
}

export default pollTeamActivity;
