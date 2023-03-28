import React from 'react';
import { Icon, Header, Grid, Popup, Segment } from 'semantic-ui-react';
import ActivityGraph from '../containers/activitygraph';

function StatRow({ title, current, previous, size, golf, inverted, type }) {
  const modifier = golf ? -1 : 1;
  const delta = current - previous;
  const circleIcon = delta >= 0 ? 'arrow circle up' : 'arrow circle down';

  const icon = title === 'Deployments' ? 'gitlab' : circleIcon;
  const sign = delta > 0 ? '+' : '';
  const color = delta * modifier >= 0 ? 'green' : 'red';

  return (
    <Grid.Row>
      <Grid.Column textAlign="left">
        <Header as={size} inverted={inverted}>
          {title}
        </Header>
      </Grid.Column>
      <Grid.Column textAlign="right">
        <Header as={size} inverted={inverted}>
          {(current || 0).toPrecision(3)}
        </Header>
      </Grid.Column>
      <Grid.Column>
        <Popup
          inverted
          on="click"
          position="bottom center"
          trigger={
            <div>
              <Header as={size} inverted={inverted}>
                <Icon name={icon} color={color} />
                {sign}
                {delta.toPrecision(3)}
              </Header>
            </div>
          }
        >
          <Segment
            compact
            basic
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: '0px 0px 15px 15px',
            }}
          >
            <ActivityGraph
              key={type}
              type={type}
              width={500}
              height={250}
              summed
            />
          </Segment>
        </Popup>
      </Grid.Column>
    </Grid.Row>
  );
}

export default StatRow;
