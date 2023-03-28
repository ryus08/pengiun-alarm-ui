/* eslint-disable camelcase, class-methods-use-this */
import P from 'bluebird';
import { assign as _assign } from 'lodash';
import penguinHost from '../constants';
import { getAccessToken } from '../auth';

class PenguinClient {
  constructor({ configName }) {
    this.configName = configName;
  }

  generateOptions() {
    return {
      auth: {
        bearer: getAccessToken(),
      },
    };
  }

  setOpinion({ mergeId, value, project_id, iid }) {
    const options = this.generateOptions();
    options.method = 'PUT';
    options.json = {
      sick: value,
      project_id,
      iid,
    };
    return fetch(
      `${penguinHost}/${this.configName}/opinions/${mergeId}`,
      options,
    );
  }

  getOpinions() {
    const options = this.generateOptions();
    return fetch(`${penguinHost}/${this.configName}/opinions`, options).then(
      (response) => JSON.parse(response),
    );
  }

  getConfig() {
    return fetch(
      `${penguinHost}/configurations/${this.configName}`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        const parsedResponse = JSON.parse(response);
        if (
          parsedResponse.newrelic &&
          parsedResponse.newrelic.policy &&
          !parsedResponse.newrelic.policies
        ) {
          parsedResponse.newrelic.policies = [parsedResponse.newrelic.policy];
          delete parsedResponse.newrelic.policy;
        }
        return parsedResponse;
      }
      return undefined;
    });
  }

  getAchievements() {
    return fetch(
      `${penguinHost}/${this.configName}/achievements`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getProjectEffort() {
    return fetch(
      `${penguinHost}/${this.configName}/projectEffort`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getCommentActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/comments`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getMergeActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/merges`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getApprovalActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/approvals`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getTeamActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/team`,
      this.generateOptions(),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  deleteConfig() {
    const options = _assign(this.generateOptions(), { method: 'DELETE' });

    return fetch(`${penguinHost}/configurations/${this.configName}`, options);
  }

  getNames({ groupIds }) {
    return P.map(groupIds, (groupId) => {
      const options = _assign(this.generateOptions(), { simple: false });

      return fetch(`${penguinHost}/groups?name=${groupId}`, options).then(
        (response) => {
          let nameIdPair = JSON.parse(response)[0];
          if (!nameIdPair) {
            nameIdPair = {
              id: groupId,
              name: `${groupId} - Missing name`,
            };
          }
          return nameIdPair;
        },
      );
    });
  }

  getDeploymentHistory() {
    return fetch(
      `${penguinHost}/${this.configName}/deploymentHistory`,
      this.generateOptions(),
    ).then((response) => JSON.parse(response));
  }

  getDeployments() {
    return fetch(
      `${penguinHost}/${this.configName}/deployments`,
      this.generateOptions(),
    ).then((response) => JSON.parse(response));
  }

  getMerges() {
    return fetch(
      `${penguinHost}/${this.configName}/merges`,
      this.generateOptions(),
    ).then((response) => JSON.parse(response));
  }

  update({ newrelic, gitlab, slideshow }) {
    const options = _assign(this.generateOptions(), {
      method: 'PUT',
      json: {
        newrelic,
        gitlab,
        slideshow,
      },
    });

    return fetch(`${penguinHost}/configurations/${this.configName}`, options);
  }
}

export default PenguinClient;
