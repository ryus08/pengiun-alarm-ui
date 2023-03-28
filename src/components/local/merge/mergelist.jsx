import React from 'react';
import { map as _map } from 'lodash';
import MergeCard from './mergecard';

function MergeList({ merges }) {
  return (
    <span>
      {_map(merges, (mergeRequest) => (
        <MergeCard key={mergeRequest.id} mergeRequest={mergeRequest} />
      ))}
    </span>
  );
}

export default MergeList;
