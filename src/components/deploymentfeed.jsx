import React from 'react';
import { Image, Feed, Header } from 'semantic-ui-react';
import LoadingPenguin from './loadingpenguin';

function DeploymentFeed({ deployments, loading, size = 'large' }) {
  const cards = deployments.map((deployment) => (
    <Feed.Event key={deployment.deploymentTime}>
      <Feed.Label>
        <Image src={deployment.userAvatar} size="small" />
      </Feed.Label>
      <Feed.Content color="white">
        <Feed.Date style={{ color: 'white' }}>
          <Header size={size} style={{ color: '#CCCCCC' }}>
            {new Date(deployment.deploymentTime).toLocaleString()}
          </Header>
        </Feed.Date>
        <Feed.Summary>
          <Header size={size}>
            <a
              href={deployment.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {deployment.projectName}
            </a>
          </Header>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  ));

  return (
    <LoadingPenguin loading={loading}>
      <Feed size="large">{cards}</Feed>
    </LoadingPenguin>
  );
}
export default DeploymentFeed;
