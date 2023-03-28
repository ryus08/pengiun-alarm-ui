// jshint ignore: start
import React from 'react';
import { Segment } from 'semantic-ui-react';

function InnerCard({ children }) {
  return (
    <Segment.Group
      style={{
        margin: '15px',
        borderRadius: '15px 15px 0px 0px',
        border: '1px solid transparent',
        borderImage: 'linear-gradient(transparent, #777777)',
        borderImageSlice: '1',
        backgroundColor: 'rgba(20, 20, 20, 0.15)',
      }}
    >
      {children}
    </Segment.Group>
  );
}

export default InnerCard;
