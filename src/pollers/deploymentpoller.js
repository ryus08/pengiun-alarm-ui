import { flatten as _flatten } from 'lodash';
import P from 'bluebird';
import GitLabClient from '../clients/gitlabclient';
import poll from './poll';

export default function deploymentPoller({ config, update }) {
  poll({
    name: 'deployment notifications',
    pollFunction: () => {
      const configuration = config();

      // no configuration at all, lets see if one comes in
      if (!configuration) {
        return P.resolve(1000);
      }

      if (!(configuration.token && configuration.groupIds)) {
        return P.resolve(5000);
      }

      const gitLabClient = new GitLabClient(configuration);
      return gitLabClient
        .getProjects(configuration)
        .map((project) => gitLabClient.getDeployments(project))
        .then((recentDeployments) => update(_flatten(recentDeployments)))
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        })
        .return(configuration.refreshRate);
    },
  });
}
