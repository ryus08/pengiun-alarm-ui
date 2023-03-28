import {
  map as _map,
  sortBy as _sortBy,
  flatten as _flatten,
  forEach as _forEach,
  filter as _filter,
  groupBy as _groupBy,
} from 'lodash';

const productionValues = ['production', 'deploy-eb-prd'];
const deploymentReducer = (
  state = {
    deployments: [],
    projectStats: [],
    loading: true,
    offset: 172800000,
  },
  action,
) => {
  switch (action.type) {
    case 'DEPLOYMENT_STATS_UPDATED': {
      const deployments = _sortBy(
        action.deployments || [],
        'deploymentTime',
      ).reverse();
      const { projectStats } = action;

      return {
        ...state,
        deployments,
        projectStats: _map(projectStats, (stat) => {
          // eslint-disable-next-line prefer-destructuring
          stat.repoUrl = stat.projectUrl.split('/pipelines/')[0];
          return stat;
        }),
        history: action.history,
        loading: false,
      };
    }

    case 'DEPLOYMENTS_UPDATED': {
      const lastPoll = new Date(new Date().valueOf() - state.offset);
      const byProject = _groupBy(action.allDeployments, 'projectName');

      let projectStats = [];
      _forEach(byProject, (value, key) => {
        const sorted = _sortBy(value, 'created_at');
        projectStats.push({
          name: key,
          first: sorted[0].created_at,
          inProd:
            productionValues.indexOf(
              sorted[sorted.length - 1].environment.name,
            ) > -1,
          numberOfDeployments: sorted.length,
          last: sorted[sorted.length - 1].created_at,
          projectUrl: `${sorted[sorted.length - 1].projectUrl}/pipelines/${
            sorted[sorted.length - 1].deployable.pipeline.id
          }`,
        });
      });

      projectStats = _sortBy(projectStats, 'last').reverse();

      const productionDeployments = _filter(
        action.allDeployments,
        (deployment) =>
          productionValues.indexOf(deployment.environment.name) > -1,
      );

      let recentDeployments = _filter(productionDeployments, (deployment) => {
        const dateDeployed = new Date(deployment.created_at);
        return dateDeployed > lastPoll;
      });

      if (recentDeployments.length < 5) {
        recentDeployments = _sortBy(productionDeployments, 'created_at')
          .reverse()
          .slice(0, 5);
      }

      const deployments = _map(_flatten(recentDeployments), (deploy) => ({
        projectName: deploy.projectName,
        deploymentTime: deploy.created_at,
        userName: deploy.user.name,
        projectAvatar: deploy.projectAvatar,
        userAvatar: deploy.user.avatar_url,
        projectUrl: `${deploy.projectUrl}/environments/${deploy.environment.id}`,
      }));

      return {
        ...state,
        deployments,
        projectStats,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default deploymentReducer;
