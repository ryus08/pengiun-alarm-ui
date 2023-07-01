import { map as _map, get as _get } from 'lodash';
import P from 'bluebird';
import PenguinClient from '../clients/penguinclient';

export function getConfigs() {
  return (dispatch) => {
    const penguinClient = new PenguinClient();
    return penguinClient.getConfigs().then((json) => {
      let configs = _map(json, ({ link, id }) => ({
        value: link,
        label: id,
      }));
      configs = configs.sort((a, b) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase()),
      );
      dispatch({ type: 'CONFIG_LIST_LOADED', configs });
    });
  };
}

export function updateConfig() {
  return (dispatch, getState) => {
    dispatch({ type: 'CONFIG_UPDATE_STARTED' });

    const config = getState().configEdit;
    const penguinClient = new PenguinClient({ configName: config.name });

    const data = {};
    if (config.newrelic.policies) {
      data.newrelic = config.newrelic;
    }

    if (config.gitlab.groups) {
      data.gitlab = {
        groupIds: _map(config.gitlab.groups, 'id'),
        alwaysShowLeaders: config.gitlab.alwaysShowLeaders,
      };
    }

    if (config.slideshow) {
      data.slideshow = config.slideshow;
    }

    return penguinClient
      .update(data)
      .then(() => dispatch({ type: 'CONFIGURATION_UPDATE_SUCEEDED' }))
      .then(() => dispatch(getConfigs()))
      .catch((err) => {
        dispatch({ type: 'EDIT_CONFIGURATION_ERROR', err });
      });
  };
}

export function addNewConfig(name) {
  return (dispatch) => {
    dispatch({ type: 'EDIT_CONFIGURATION_LOADED', configuration: {}, name });
  };
}

export function deleteConfig() {
  return (dispatch, getState) => {
    dispatch({ type: 'CONFIG_UPDATE_STARTED' });

    const config = getState().configEdit;
    const penguinClient = new PenguinClient({ configName: config.name });
    return penguinClient
      .deleteConfig()
      .then(() => dispatch({ type: 'CONFIGURATION_UPDATE_SUCEEDED' }))
      .then(() => dispatch({ type: 'EDIT_CONFIGURATION_RESET' }))
      .then(() => dispatch(getConfigs()))
      .catch((err) => {
        dispatch({ type: 'EDIT_CONFIGURATION_ERROR', err });
      });
  };
}

export function loadConfig({ name }) {
  return (dispatch) => {
    const penguinClient = new PenguinClient({ configName: name });
    return penguinClient
      .getConfig()
      .then((config) => {
        if (_get(config, 'gitlab.groupIds')) {
          return penguinClient
            .getGroups({ groupIds: config.gitlab.groupIds })
            .then((names) => {
              config.gitlab.groups = names;
            })
            .return(config);
        }
        return P.resolve();
      })
      .then((configuration) =>
        dispatch({ type: 'EDIT_CONFIGURATION_LOADED', configuration, name }),
      )
      .catch((err) => {
        dispatch({ type: 'EDIT_CONFIGURATION_ERROR', err });
      });
  };
}
