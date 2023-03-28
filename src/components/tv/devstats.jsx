// jshint ignore: start
import React from 'react';
import { Image, Icon, Header, Grid } from 'semantic-ui-react';

const colors = ['yellow', 'grey', 'orange'];

function DevStats({ mergeStat, place, inverted }) {
  return (
    <Grid divided="vertically" verticalAlign="middle">
      <Grid.Row columns={2}>
        <Grid.Column>
          <Icon.Group size="huge">
            <Image bordered avatar src={mergeStat.avatar_url} size="small" />
            {place < 3 && (
              <Icon corner name="trophy" size="huge" color={colors[place]} />
            )}
          </Icon.Group>
        </Grid.Column>
        <Grid.Column>
          <Header
            style={{ padding: '2px' }}
            size="medium"
            {...(inverted ? { inverted: true } : {})}
          >
            <Icon name="empty star" size="mini" color="grey" />
            <Header.Content>
              {' '}
              {mergeStat.data.score.toPrecision(3)}{' '}
            </Header.Content>
          </Header>
          <Header
            style={{ padding: '2px' }}
            size="medium"
            {...(inverted ? { inverted: true } : {})}
          >
            <Icon name="thumbs outline up" size="mini" color="grey" />
            <Header.Content> {mergeStat.data.approvals}</Header.Content>
          </Header>
          <Header
            style={{ padding: '2px' }}
            size="medium"
            {...(inverted ? { inverted: true } : {})}
          >
            <Icon name="comment outline" size="mini" color="grey" />
            <Header.Content> {mergeStat.data.comments} </Header.Content>
          </Header>
          <Header
            style={{ padding: '2px' }}
            size="medium"
            {...(inverted ? { inverted: true } : {})}
          >
            <Icon name="file outline" size="mini" color="grey" />
            <Header.Content> {mergeStat.data.authored}</Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default DevStats;
