import { map as _map } from 'lodash';

const opinions = (
  state = {
    opinions: [],
    loading: true,
  },
  action,
) => {
  switch (action.type) {
    case 'OPINION_UPDATE_STARTED': {
      state.loading = true;
      return state;
    }

    case 'OPINION_UPDATE_FINISHED': {
      return {
        ...state,
        opinions: _map(state.opinions, (opinion) =>
          opinion.id === action.mergeId
            ? { ...opinion, sick: action.value }
            : opinion,
        ),
        loading: false,
      };
    }

    case 'OPINION_LOAD_FINISHED': {
      return { ...state, opinions: action.opinions, loading: false };
    }

    default: {
      return state;
    }
  }
};

export default opinions;
