// jshint ignore: start
import React from 'react';
import ActiveMerges from '../../containers/canmerge';
import Tile from '../local/tile';

function MergeFeedCard({ type, title }) {
  return (
    <Tile name={title} shadeColor="white" headerContrast="0.50">
      <ActiveMerges type={type} target="tv" />
    </Tile>
  );
}

export default MergeFeedCard;
