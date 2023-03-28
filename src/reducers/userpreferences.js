const configuration = (
  state = {
    topColor: { r: 47, g: 98, b: 168 },
    bottomColor: { r: 35, g: 43, b: 54 },
  },
  action,
) => {
  switch (action.type) {
    // when a round is loaded, we need to clear
    // out the monitor
    case 'USER_PREFERENCES_CHANGED': {
      return { ...state, ...action.data };
    }

    default: {
      return state;
    }
  }
};

export default configuration;
