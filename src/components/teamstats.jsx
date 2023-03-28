import React from 'react';
import { map as _map } from 'lodash';
import { Grid } from 'semantic-ui-react';
import StatRow from './statrow';
import LoadingPenguin from './loadingpenguin';

function TeamStats({ teamStats, inverted, loading }) {
  const isInverted = inverted === undefined;
  const types = {
    'Approval Time (hours)': 'approvals',
    'Comment Rate': 'comments',
  };

  return (
    <LoadingPenguin loading={loading}>
      <Grid columns="3">
        {_map(teamStats, (teamStat) => (
          <StatRow
            key={teamStat.name}
            title={teamStat.name}
            size="h3"
            type={types[teamStat.name] || 'merges'}
            current={teamStat.current}
            previous={teamStat.previous}
            golf={teamStat.golf}
            inverted={isInverted}
          />
        ))}
      </Grid>
    </LoadingPenguin>
  );
}

export default TeamStats;
