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
      (response) => response.json(),
    );
  }

  getConfig() {
    return fetch(
      `${penguinHost}/configurations/${this.configName}`,
      this.generateOptions(),
    )
      .then((response) => response.json())
      .then((parsedResponse) => {
        if (
          parsedResponse.newrelic &&
          parsedResponse.newrelic.policy &&
          !parsedResponse.newrelic.policies
        ) {
          parsedResponse.newrelic.policies = [parsedResponse.newrelic.policy];
          delete parsedResponse.newrelic.policy;
        }
        return parsedResponse;
      });
  }

  getAchievements() {
    return fetch(
      `${penguinHost}/${this.configName}/achievements`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getProjectEffort() {
    return fetch(
      `${penguinHost}/${this.configName}/projectEffort`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getCommentActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/comments`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getMergeActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/merges`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getApprovalActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/approvals`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getTeamActivity() {
    return fetch(
      `${penguinHost}/${this.configName}/activity/team`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  deleteConfig() {
    const options = _assign(this.generateOptions(), { method: 'DELETE' });

    return fetch(`${penguinHost}/configurations/${this.configName}`, options);
  }

  getNames({ groupIds }) {
    return P.map(groupIds, (groupId) => {
      const options = _assign(this.generateOptions(), { simple: false });

      return fetch(`${penguinHost}/groups?name=${groupId}`, options)
        .then((response) => response.json())
        .then((data) => {
          let nameIdPair = data[0];
          if (!nameIdPair) {
            nameIdPair = {
              id: groupId,
              name: `${groupId} - Missing name`,
            };
          }
          return nameIdPair;
        });
    });
  }

  getDeploymentHistory() {
    return fetch(
      `${penguinHost}/${this.configName}/deploymentHistory`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getDeployments() {
    return fetch(
      `${penguinHost}/${this.configName}/deployments`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  getMerges() {
    return fetch(
      `${penguinHost}/${this.configName}/merges`,
      this.generateOptions(),
    ).then((response) => response.json());
  }

  update({ newrelic, gitlab, slideshow }) {
    const options = _assign(this.generateOptions(), {
      method: 'PUT',
      body: JSON.stringify({
        newrelic,
        gitlab,
        slideshow,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return fetch(`${penguinHost}/configurations/${this.configName}`, options);
  }
}

export default PenguinClient;
