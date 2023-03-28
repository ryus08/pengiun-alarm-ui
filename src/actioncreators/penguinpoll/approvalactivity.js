import penguinPoller from '../../pollers/activitypoller';

function pollApprovalActivity({ penguinClient }) {
  return (dispatch) => {
    penguinPoller({
      config: () => ({
        pollMethod: () => penguinClient.getApprovalActivity(),
        refreshRate: 1200000,
      }),
      update: ({ data }) => {
        dispatch({ type: 'APPROVAL_ACTIVITY_UPDATED', approvals: data });
      },
    });
  };
}

export default pollApprovalActivity;
