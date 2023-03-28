/* eslint-disable complexity */
import { get as _get } from 'lodash';

const configuration = (
  state = {
    newrelic: { refreshRate: 30000 },
    gitlab: { groups: [], alwaysShowLeaders: false },
    slideshow: { youtube: [], refreshRate: 120000 },
    updating: false,
    configs: [],
  },
  action,
) => {
  switch (action.type) {
    // when a round is loaded, we need to clear
    // out the monitor
    case 'EDIT_CONFIGURATION_LOADED': {
      return {
        ...state,
        name: action.name,
        newrelic: _get(action, 'configuration.newrelic', {}),
        gitlab: _get(action, 'configuration.gitlab', state.gitlab),
        slideshow: _get(action, 'configuration.slideshow', state.slideshow),
      };
    }

    case 'CONFIG_LIST_LOADED': {
      return { ...state, configs: action.configs };
    }

    case 'EDIT_CONFIGURATION_RESET': {
      return {
        ...state,
        name: undefined,
        newrelic: { policies: undefined, refreshRate: 30000 },
        gitlab: { groups: [] },
        slideshow: { youtube: [], refreshRate: 120000 },
      };
    }

    case 'CONFIG_UPDATE_STARTED': {
      state.updating = true;
      return { ...state, error: undefined };
    }

    case 'TOGGLE_SHOWLEADERS': {
      const gitlab = {
        ...state.gitlab,
        alwaysShowLeaders: !_get(state, 'gitlab.alwaysShowLeaders', false),
      };
      return { ...state, gitlab };
    }

    case 'SET_YOUTUBE': {
      const slideshow = { ...state.slideshow, youtube: action.data };
      return { ...state, slideshow };
    }

    case 'SET_GITLAB_GROUPS': {
      const gitlab = { ...state.gitlab, groups: action.data };
      return { ...state, gitlab };
    }

    case 'SET_NEWRELIC': {
      const newrelic = { ...state.newrelic, policies: action.data };
      return { ...state, newrelic };
    }

    case 'CONFIGURATION_UPDATE_SUCEEDED': {
      return { ...state, error: undefined, updating: false };
    }

    case 'EDIT_CONFIGURATION_ERROR': {
      return { ...state, error: action.err, updating: false };
    }

    default: {
      return state;
    }
  }
};

export default configuration;
