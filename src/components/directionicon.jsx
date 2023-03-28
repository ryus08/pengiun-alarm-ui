// jshint ignore: start
import React from 'react';
import { Icon } from 'semantic-ui-react';

function DirectionIcon({ delta, golf = false }) {
  const modifier = golf ? -1 : 1;
  const icon = delta >= 0 ? 'arrow circle up' : 'arrow circle down';
  const color = delta * modifier >= 0 ? 'green' : 'red';

  return <Icon name={icon} color={color} />;
}

export default DirectionIcon;
