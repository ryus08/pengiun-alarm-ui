// jshint ignore: start
import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityGraph from '../../containers/activitygraph';
import DeploymentTimeline from '../../containers/deploymenttimeline';
import ProjectEffort from '../../containers/projecteffort';
import MultiTile from './multitile';

function GraphView() {
  const options = [
    {
      value: 'comments',
      text: 'Comment History',
      content: <ActivityGraph key="comments" type="comments" />,
    },
    {
      value: 'approvals',
      text: 'Approval History',
      content: <ActivityGraph key="approvals" type="approvals" />,
    },
    {
      value: 'merges',
      text: 'Merge History',
      content: <ActivityGraph key="merges" type="merges" />,
    },
    {
      value: 'team',
      text: 'Team Stats',
      content: <ActivityGraph key="team" type="team" />,
    },
    {
      value: 'deploy',
      text: 'Deployment Timeline',
      content: <DeploymentTimeline />,
    },
    {
      value: 'effort',
      text: 'Project Effort',
      content: <ProjectEffort />,
    },
    ...{},
  ];
  return (
    <Grid padded column="1">
      <Grid.Column>
        <MultiTile options={options} />
      </Grid.Column>
    </Grid>
  );
}

export default GraphView;
