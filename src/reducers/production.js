const newrelic = (
  state = { violations: [], error: false, recentDeployments: [] },
  action,
) => {
  switch (action.type) {
    case 'NEW_RELIC_ERROR': {
      return { ...state, error: true };
    }

    case 'NEW_RELIC_UPDATED': {
      return { ...state, violations: action.violations, error: false };
    }

    default: {
      return state;
    }
  }
};

export default newrelic;
