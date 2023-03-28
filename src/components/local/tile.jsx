import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

function Tile({ name, shadeColor, children, headerContrast = '0.35' }) {
  return (
    <Segment.Group
      style={{
        backgroundColor: shadeColor || 'rgba(0, 0, 0, .25)',
        marginTop: '30px',
        borderRadius: '20px',
        border: '1px solid #111111',
      }}
    >
      <Segment
        inverted
        textAlign="left"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${headerContrast})`,
          borderRadius: '15px 15px 0px 0px',
        }}
      >
        <Header attach="top">
          <Header.Content>{name}</Header.Content>
        </Header>
      </Segment>
      <Segment
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderRadius: '0px 0px 15px 15px',
        }}
      >
        {children}
      </Segment>
    </Segment.Group>
  );
}

export default Tile;
