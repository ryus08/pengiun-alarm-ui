const configuration = (
  state = {
    newrelic: {},
    gitlab: { groupIds: [] },
    slideshow: { youtube: [] },
    name: undefined,
    error: undefined,
  },
  action,
) => {
  switch (action.type) {
    // when a round is loaded, we need to clear
    // out the monitor
    case 'CONFIGURATION_LOADED': {
      const config = action.configuration;
      return {
        ...state,
        ...config,
        error: undefined,
        name: action.name,
      };
    }

    case 'CONFIGURATION_ERROR': {
      return { ...state, error: action.error };
    }

    default: {
      return state;
    }
  }
};

export default configuration;
