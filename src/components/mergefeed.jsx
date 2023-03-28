import React from 'react';
import { Feed } from 'semantic-ui-react';
import LoadingPenguin from './loadingpenguin';
import MergeCard from './local/mergecard';

function MergeFeed({
  mergeRequests,
  loading,
  setSickness,
  showOpinions,
  target,
}) {
  const cards = mergeRequests.map((mergeRequest, i) => (
    <MergeCard
      key={mergeRequest.id}
      mergeRequest={mergeRequest}
      setSickness={setSickness}
      showOpinions={showOpinions}
      last={i === mergeRequests.length - 1}
      target={target}
    />
  ));

  return (
    <LoadingPenguin loading={loading}>
      <Feed size="large">{cards}</Feed>
    </LoadingPenguin>
  );
}
export default MergeFeed;
