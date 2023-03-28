/* eslint-disable camelcase */
import PenguinClient from '../clients/penguinclient';

export function setOpinion({ mergeId, value, project_id, iid }) {
  return (dispatch, getState) => {
    dispatch({ type: 'OPINION_UPDATE_STARTED' });

    const config = getState().configuration;
    const penguinClient = new PenguinClient({ configName: config.name });

    return penguinClient
      .setOpinion({
        mergeId,
        value,
        project_id,
        iid,
      })
      .then(() =>
        dispatch({ type: 'OPINION_UPDATE_FINISHED', mergeId, value }),
      );
  };
}

export function getOpinions({ penguinClient }) {
  return (dispatch, getState) => {
    dispatch({ type: 'OPINION_UPDATE_STARTED' });

    const client =
      penguinClient ||
      new PenguinClient({ configName: getState().configEdit.name });

    return client
      .getOpinions()
      .then((opinions) =>
        dispatch({ type: 'OPINION_LOAD_FINISHED', opinions }),
      );
  };
}
