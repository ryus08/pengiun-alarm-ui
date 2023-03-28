/* eslint-disable camelcase, no-return-assign */
import P from 'bluebird';
import rp from 'request-promise';
import { flatten as _flatten, filter as _filter, map as _map } from 'lodash';

const gitlab = 'https://gitlab.com/api/v4/groups/3730788';

class GitLabClient {
  constructor({ token }) {
    this.token = token;
  }

  getProjects({ groupIds }) {
    return P.map(groupIds, (groupId) =>
      rp(`${gitlab}groups/${groupId}?private_token=${this.token}`),
    )
      .then((responses) =>
        _flatten(_map(responses, (response) => JSON.parse(response).projects)),
      )
      .then((projects) =>
        projects.filter((project) => project.merge_requests_enabled),
      );
  }

  addNotes({ merge }) {
    return rp(
      `${gitlab}/projects/${merge.project_id}/merge_requests/${merge.iid}/notes?private_token=${this.token}`,
    ).then((response) => {
      const notes = JSON.parse(response);
      merge.notes = notes;
      return merge;
    });
  }

  addOtherComments({ merge }) {
    return rp(
      `${gitlab}/projects/${merge.project_id}/merge_requests/${merge.iid}/notes?private_token=${this.token}`,
    ).then((response) => {
      const comments = _filter(
        JSON.parse(response),
        (note) =>
          note.system === false && note.author.name !== merge.author.name,
      );
      merge.comments = comments;
      return merge;
    });
  }

  getApprovals({ merge }) {
    return rp(
      `${gitlab}/projects/${merge.project_id}/merge_requests/${merge.iid}/approvals?private_token=${this.token}`,
    ).then((response) => {
      const approvers = JSON.parse(response);
      merge.approvers = approvers;
      return merge;
    });
  }

  getOpenMergeRequests({ projectId, projectName }) {
    return rp(
      `${gitlab}/projects/${projectId}/merge_requests?scope=all&state=opened&private_token=${this.token}`,
    )
      .then((response) => JSON.parse(response))
      .then((response) => {
        response.forEach((mr) => (mr.projectName = projectName));
        return response;
      });
  }

  getRecentMergeRequests({ projectId, projectName, numberOfDays = 14 }) {
    const d = new Date();
    d.setDate(d.getDate() - numberOfDays);
    return rp(
      `${gitlab}/projects/${projectId}/merge_requests?scope=all&created_after=${d.toJSON()}&private_token=${
        this.token
      }`,
    )
      .then((response) => JSON.parse(response))
      .then((response) => {
        response.forEach((mr) => (mr.projectName = projectName));
        return response;
      });
  }

  getDeployments({ id, name, avatar_url, web_url }) {
    return rp({
      uri: `${gitlab}projects/${id}/deployments?private_token=${this.token}`,
      method: 'HEAD',
    })
      .then((response) =>
        rp(
          `${gitlab}projects/${id}/deployments?private_token=${this.token}&page=${response['x-total-pages']}`,
        ),
      )
      .then((response) => JSON.parse(response))
      .then((response) => {
        response.forEach((deployment) => {
          deployment.projectName = name;
          deployment.projectAvatar = avatar_url;
          deployment.projectUrl = web_url;
        });
        return response;
      });
  }
}

export default GitLabClient;
