import {
  filter as _filter,
  flatten as _flatten,
  map as _map,
  get as _get,
  keys as _keys,
  forEach as _forEach,
  includes as _includes,
  concat as _concat,
  values as _values,
} from 'lodash';
import P from 'bluebird';
import poll from './poll';
import GitLabClient from '../clients/gitlabclient';

const oldMerges = {};

export default function mergeParticipationPoller({ config, update }) {
  poll({
    name: 'merge participation',
    pollFunction: () => {
      const configuration = config();

      // no configuration at all, lets see if one comes in
      if (!configuration) {
        return P.resolve(1000);
      }

      if (!(configuration.token && configuration.groupIds)) {
        return P.resolve(5000);
      }

      const numberOfDays = _get(configuration, 'numberOfDays', 14);
      const gitLabClient = new GitLabClient(configuration);
      const days = numberOfDays * 2;

      return (
        gitLabClient
          .getProjects(configuration)
          .map((project) =>
            gitLabClient.getRecentMergeRequests({
              projectId: project.id,
              projectName: project.name,
              numberOfDays: days,
            }),
          )
          .then((merges) =>
            _flatten(_filter(merges, (merge) => merge.length > 0)),
          )
          .then((merges) =>
            _filter(merges, (merge) => merge.state !== 'closed'),
          )
          .then((merges) => {
            const mergeIds = _map(merges, 'web_url');
            // drop all the merges we already looked at
            const newMerges = _filter(
              merges,
              (merge) => !oldMerges[merge.web_url],
            );

            // then drop all the old merges that have expired because they are not in this
            // update list
            const expiredValues = _filter(
              _keys(oldMerges),
              (oldId) => !_includes(mergeIds, oldId),
            );
            _forEach(expiredValues, (expired) => delete oldMerges[expired]);

            return newMerges;
          })
          // for the merges that we are actively updating, add the comments and approvals
          .map((merge) => gitLabClient.addOtherComments({ merge }))
          .map((merge) => gitLabClient.getApprovals({ merge }))
          .then((activeMerges) => {
            // put the active and inactive merges together, its what we'll end up returning
            const retVal = _concat(_values(oldMerges), activeMerges);

            activeMerges.forEach((activeMerge) => {
              // if we hadn't seen this merge before, but its now merged,
              // we can stop looking at it
              if (activeMerge.state === 'merged') {
                oldMerges[activeMerge.web_url] = activeMerge;
              }
            });
            return retVal;
          })
          .then((merges) => update({ merges, numberOfDays }))
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e);
          })
          .return(configuration.refreshRate)
      );
    },
  });
}
