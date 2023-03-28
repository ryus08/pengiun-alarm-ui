// jshint ignore: start
import React from 'react';
import { Grid, Image, Card, Feed, Header } from 'semantic-ui-react';
import { map as _map, orderBy as _orderBy } from 'lodash';
import Tile from './tile';

const dateDiff = (dateIndex) => {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() - (28 - dateIndex));
  return tomorrow.toLocaleDateString();
};

function Achievements({ achievements }) {
  return (
    <Grid
      columns="3"
      padded
      relaxed
      stackable
      stretched
      style={{ paddingBottom: '70px' }}
    >
      {_map(achievements, (achievement) => (
        <Grid.Column>
          <Tile name={achievement.name}>
            <Grid columns="2" container>
              <Grid.Column width="8">
                <Card
                  style={{
                    background:
                      'linear-gradient(rgba(0, 0, 0, .3) 80%, rgba(0, 0, 0, .3))',
                    boxShadow: '0 0px 0px 0 #000000, 0 0 0 0px #000000',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(47, 98, 168, 1)',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={achievement.image}
                      style={{
                        filter: 'grayscale(100%) hue-rotate( 140deg )',
                        opacity: '0.8',
                        border: '1px solid black',
                      }}
                    />
                  </div>
                  <Card.Content>
                    <Card.Description
                      textAlign="center"
                      style={{ color: 'white' }}
                    >
                      {achievement.rule}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column width="8">
                <Feed size="large">
                  {_map(
                    _orderBy(achievement.winners, 'dateIndex').reverse(),
                    (winner) => (
                      <Feed.Event
                        key={`${winner.user.avatar}-${winner.user.dateIndex}-${achievement.name}`}
                      >
                        <Feed.Label image={winner.user.avatar} />
                        <Feed.Content>
                          <Feed.Date>
                            <Header
                              size="mini"
                              style={{
                                color: winner.isYou ? 'white' : '#CCCCCC',
                              }}
                            >
                              {dateDiff(winner.dateIndex)}
                            </Header>
                          </Feed.Date>
                          <Feed.Summary
                            style={{
                              color: winner.isYou ? 'white' : '#777777',
                            }}
                          >
                            {winner.user.name}
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ),
                  )}
                </Feed>
              </Grid.Column>
            </Grid>
          </Tile>
        </Grid.Column>
      ))}
    </Grid>
  );
}

export default Achievements;
