import React from 'react';
import { map as _map } from 'lodash';
import { List } from 'semantic-ui-react';
import DevStats from './devstats';

function DevStatTable({ mergeStats, inverted, horizontal, maxSize }) {
  const isInverted = inverted === undefined;
  const isHorizontal = horizontal === undefined;

  return (
    <List horizontal={isHorizontal} divided inverted={isInverted}>
      {_map(
        mergeStats.slice(0, maxSize || mergeStats.length),
        (mergeStat, i) => (
          <List.Item key={mergeStat.avatar_url}>
            <List.Content>
              <DevStats mergeStat={mergeStat} place={i} inverted={isInverted} />
            </List.Content>
          </List.Item>
        ),
      )}
    </List>
  );
}

export default DevStatTable;
