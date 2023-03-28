/* eslint-disable camelcase, class-methods-use-this */
import rp from 'request-promise';
import P from 'bluebird';
import { assign as _assign } from 'lodash';
import penguinHost from '../constants';
import { getAccessToken } from '../auth';

class PenguinClient {
  constructor({ configName }) {
    this.configName = configName;
  }

  generateOptions(uri) {
    return {
      uri,
      auth: {
        bearer: getAccessToken(),
      },
    };
  }

  setOpinion({ mergeId, value, project_id, iid }) {
    const options = this.generateOptions(
      `${penguinHost}/${this.configName}/opinions/${mergeId}`,
    );
    options.method = 'PUT';
    options.json = {
      sick: value,
      project_id,
      iid,
    };
    return rp(options);
  }

  getOpinions() {
    const options = this.generateOptions(
      `${penguinHost}/${this.configName}/opinions`,
    );
    return rp(options).then((response) => JSON.parse(response));
  }

  getConfig() {
    return rp(
      this.generateOptions(`${penguinHost}/configurations/${this.configName}`),
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
    return rp(
      this.generateOptions(`${penguinHost}/${this.configName}/achievements`),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getProjectEffort() {
    return rp(
      this.generateOptions(`${penguinHost}/${this.configName}/projectEffort`),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getCommentActivity() {
    return rp(
      this.generateOptions(
        `${penguinHost}/${this.configName}/activity/comments`,
      ),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getMergeActivity() {
    return rp(
      this.generateOptions(`${penguinHost}/${this.configName}/activity/merges`),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getApprovalActivity() {
    return rp(
      this.generateOptions(
        `${penguinHost}/${this.configName}/activity/approvals`,
      ),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  getTeamActivity() {
    return rp(
      this.generateOptions(`${penguinHost}/${this.configName}/activity/team`),
    ).then((response) => {
      if (response) {
        return JSON.parse(response);
      }
      return undefined;
    });
  }

  deleteConfig() {
    const options = _assign(
      this.generateOptions(`${penguinHost}/configurations/${this.configName}`),
      { method: 'DELETE' },
    );

    return rp(options);
  }

  getNames({ groupIds }) {
    return P.map(groupIds, (groupId) => {
      const options = _assign(
        this.generateOptions(`${penguinHost}/groups?name=${groupId}`),
        { simple: false },
      );

      return rp(options).then((response) => {
        let nameIdPair = JSON.parse(response)[0];
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
    return rp(
      this.generateOptions(
        `${penguinHost}/${this.configName}/deploymentHistory`,
      ),
    ).then((response) => JSON.parse(response));
  }

  getDeployments() {
    return rp(
      this.generateOptions(`${penguinHost}/${this.configName}/deployments`),
    ).then((response) => JSON.parse(response));
  }

  getMerges() {
    return rp(
      this.generateOptions(`${penguinHost}/${this.configName}/merges`),
    ).then((response) => JSON.parse(response));
  }

  update({ newrelic, gitlab, slideshow }) {
    const options = _assign(
      this.generateOptions(`${penguinHost}/configurations/${this.configName}`),
      {
        method: 'PUT',
        json: {
          newrelic,
          gitlab,
          slideshow,
        },
      },
    );

    return rp(options);
  }
}

export default PenguinClient;
