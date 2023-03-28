import React from 'react';
import { map as _map } from 'lodash';
import { List, Header, Icon } from 'semantic-ui-react';
import Tile from './tile';

function Violations({ violations, error, active }) {
  let inverted = false;
  let color = 'rgba(0, 0, 0, 0.3)';
  let content = (
    <Header size="large" icon color="green" inverted>
      <Icon name="smile" size="massive" inverted />
      The sky is not falling!
    </Header>
  );

  if (violations.length) {
    inverted = true;
    color = 'rgba(255, 0, 0, 0.7)';
    content = _map(violations, (violation) => (
      <List.Item>
        <a href={violation.link} target="_blank" rel="noopener noreferrer">
          <Header size="large">{violation.name}</Header>
        </a>
      </List.Item>
    ));
  }

  if (error) {
    inverted = true;
    color = 'yellow';
    content = <Header size="medium">Error contacting New Relic</Header>;
  }

  if (!active) {
    return <div />;
  }

  return (
    <Tile name="Open Violations" shadeColor={color}>
      <List inverted={inverted}>{content}</List>
    </Tile>
  );
}

export default Violations;
