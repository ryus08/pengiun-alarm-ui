/* eslint-disable camelcase, class-methods-use-this */
import P from 'bluebird';
import { getUserFromStorage } from '../auth';
import rpConverter from './rpConverter';

export const penguinHost = process.env.REACT_APP_PENGUIN_HOST.replaceAll(
  "'",
  '',
).trim();

// TODO: should have a differnt client for a specific config vs no specific context
class PenguinClient {
  constructor({ configName } = {}) {
    this.configName = configName;
    this.user = getUserFromStorage();
  }

  generateOptions(rpOptions = {}) {
    rpOptions.headers = rpOptions.headers || {};
    rpOptions.headers.Authorization = `Bearer ${this.user?.access_token}`;
    return rpConverter.generateOptions(rpOptions);
  }

  setOpinion({ mergeId, value, project_id, iid }) {
    const options = this.generateOptions({
      method: 'PUT',
      json: {
        sick: value,
        project_id,
        iid,
      },
    });
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

  getConfigs() {
    return fetch(`${penguinHost}/configurations`, this.generateOptions()).then(
      (response) => response.json(),
    );
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
    return fetch(
      `${penguinHost}/configurations/${this.configName}`,
      this.generateOptions({ method: 'DELETE' }),
    );
  }

  getGroups({ groupIds }) {
    return P.map(groupIds, (groupId) => {
      return fetch(
        `${penguinHost}/groups?name=${groupId}`,
        this.generateOptions(),
      )
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

  searchGroups({ name, asMaintainer = false }) {
    const maintainerAppend = asMaintainer ? '&asMaintainer=true' : '';
    return fetch(
      `${penguinHost}/groups?name=${name}${maintainerAppend}`,
      this.generateOptions(),
    ).then((response) => response.json());
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
    return fetch(
      `${penguinHost}/configurations/${this.configName}`,
      this.generateOptions({
        method: 'PUT',
        json: {
          newrelic,
          gitlab,
          slideshow,
        },
      }),
    );
  }

  setUserPreferences(json) {
    return fetch(
      `${penguinHost}/preferences`,
      this.generateOptions({
        method: 'PUT',
        json,
      }),
    ).then((response) => response.json());
  }

  getUserPreferences() {
    return fetch(`${penguinHost}/preferences`, this.generateOptions()).then(
      (response) => response.json(),
    );
  }

  setUserGitProvider(providerName, json) {
    return fetch(
      `${penguinHost}/preferences/gitProvider`,
      this.generateOptions({
        method: 'PUT',
        json: { ...json, providerName },
      }),
    ).then((response) => response.json());
  }

  deleteUserGitProvider() {
    return fetch(
      `${penguinHost}/preferences/gitProvider`,
      this.generateOptions({
        method: 'DELETE',
      }),
    );
  }
}

export default PenguinClient;
