import penguinPoller from '../../pollers/activitypoller';

function pollAchievements({ penguinClient }) {
  return (dispatch, getState) => {
    penguinPoller({
      config: () => ({
        pollMethod: () => penguinClient.getAchievements(),
        refreshRate: 1200000,
      }),
      update: ({ data }) => {
        const username = getState().userPreferences.gitLabUsername;
        dispatch({
          type: 'ACHIEVEMENTS_UPDATED',
          achievements: data,
          username,
        });
      },
    });
  };
}

export default pollAchievements;
