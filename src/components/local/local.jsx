import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import TeamStats from '../../containers/teamstats';
import DevCards from '../../containers/devcards';
import ActiveMerges from '../../containers/canmerge';
import RecentDeployments from '../../containers/recentdeployments';
import Violations from '../../containers/violations';
import Services from '../../containers/services';
import ConfigError from '../../containers/configerror';
import MergeList from '../../containers/merge/mergelist';
import Tile from './tile';

function Local({ showSelf = false }) {
  return (
    <Grid columns="3" textAlign="center" padded inverted stackable>
      <Grid.Row textAlign="center">
        <ConfigError />
        <Grid.Column>
          <Header size="huge" inverted dividing>
            To Do
          </Header>

          <Tile name="Open Merges">
            <MergeList showSelf={showSelf} />
          </Tile>

          <Tile name="Recently Merged">
            <ActiveMerges type="recent" showOpinions="true" />
          </Tile>
        </Grid.Column>

        <Grid.Column>
          <Header size="huge" inverted dividing>
            Performance
          </Header>
          <Tile name="Team Stats">
            <TeamStats />
          </Tile>
          <Tile name="Developers">
            <DevCards horizontal="false" />
          </Tile>
        </Grid.Column>

        <Grid.Column>
          <Header size="huge" inverted dividing>
            Production
          </Header>
          <Violations />
          <Tile name="Recent Deployments">
            <RecentDeployments size="small" />
          </Tile>
          <Tile name="Services">
            <Services />
          </Tile>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Local;
