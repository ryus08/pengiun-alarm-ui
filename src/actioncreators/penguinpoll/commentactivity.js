import penguinPoller from '../../pollers/activitypoller';

function pollCommentActivity({ penguinClient }) {
  return (dispatch) => {
    penguinPoller({
      config: () => ({
        pollMethod: () => penguinClient.getCommentActivity(),
        refreshRate: 1200000,
      }),
      update: ({ data }) => {
        dispatch({ type: 'COMMENT_ACTIVITY_UPDATED', comments: data });
      },
    });
  };
}

export default pollCommentActivity;
