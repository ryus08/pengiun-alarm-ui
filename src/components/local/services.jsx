// jshint ignore: start
import React from 'react';
import { map as _map } from 'lodash';
import { Icon, Header, Segment, Button } from 'semantic-ui-react';
import InnerCard from './innercard';
import InnerHeading from './innerheading';
import LoadingPenguin from '../loadingpenguin';

function ProjectStats({ projectStats, loading }) {
  return (
    <LoadingPenguin loading={loading}>
      {_map(projectStats, (stat) => (
        <InnerCard key={stat.name}>
          <InnerHeading>
            <Header size="medium" style={{ color: 'white' }}>
              <a href={stat.repoUrl} target="_blank" rel="noopener noreferrer">
                {!stat.inProd && <Icon name="warning sign" color="yellow" />}
                {stat.name}
              </a>
            </Header>
          </InnerHeading>
          <Segment.Group horizontal>
            <Segment>
              <Header size="small" style={{ color: '#CCCCCC' }}>
                Deployments: {stat.numberOfDeployments}
              </Header>
            </Segment>
            <Segment>
              {!stat.inProd && (
                <a
                  href={stat.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button primary>Deploy</Button>
                </a>
              )}
              {stat.inProd && (
                <Header color="green" size="small">
                  <Icon name="checkmark box" />
                  Up to date
                </Header>
              )}
            </Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Header size="small" style={{ color: '#CCCCCC' }}>
                {' '}
                First: {new Date(stat.first).toLocaleDateString()}{' '}
                {new Date(stat.first).toLocaleTimeString()}
              </Header>
            </Segment>
            <Segment>
              <Header size="small" style={{ color: '#CCCCCC' }}>
                Last: {new Date(stat.last).toLocaleDateString()}{' '}
                {new Date(stat.last).toLocaleTimeString()}
              </Header>
            </Segment>
          </Segment.Group>
        </InnerCard>
      ))}
    </LoadingPenguin>
  );
}

export default ProjectStats;
