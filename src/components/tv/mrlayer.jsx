import React from 'react';
import { Grid } from 'semantic-ui-react';
import MergeFeedCard from './mergefeedcard';
import DevStats from '../../containers/devstats';
import TeamStats from '../../containers/teamstats';

const MrLayer = ({ showLeaders, needsApprovalNum, needsMergeNum }) => {
  const bgstyle =
    needsApprovalNum + needsMergeNum > 0
      ? { backgroundColor: 'rgba(0,0,0,0.85)' }
      : {
          background:
            'linear-gradient(rgba(0, 0, 0, 0.85) 45%, rgba(0, 0, 0, .05))',
        };

  let content = <span />;
  if (showLeaders) {
    content = (
      <div style={bgstyle}>
        <div style={{ padding: 20, overflow: 'auto' }}>
          <Grid columns="3">
            <Grid.Column width="4">
              <div style={{ marginTop: '-30px' }}>
                {needsApprovalNum > 0 && (
                  <MergeFeedCard type="needsApproval" title="Needs Approval" />
                )}
                {needsMergeNum > 0 && (
                  <MergeFeedCard type="canMerge" title="Can merge" />
                )}
              </div>
            </Grid.Column>
            <Grid.Column width="8" textAlign="right">
              <DevStats maxSize="3" />
            </Grid.Column>
            <Grid.Column width="4">
              <TeamStats />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }

  return content;
};

export default MrLayer;
