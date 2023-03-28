// jshint ignore: start
import React from 'react';
import { Segment } from 'semantic-ui-react';

function InnerHeading({ children }) {
  return (
    <Segment
      textAlign="left"
      basic
      style={{
        background:
          'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))',
        borderRadius: '15px 15px 0px 0px',
      }}
    >
      {children}
    </Segment>
  );
}

export default InnerHeading;
