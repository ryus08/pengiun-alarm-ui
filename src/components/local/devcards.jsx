import React from 'react';
import { map as _map } from 'lodash';
import { Segment, Image, Icon, Header, Grid, List } from 'semantic-ui-react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import LoadingPenguin from '../loadingpenguin';
import InnerCard from './innercard';
import InnerHeading from './innerheading';

const colors = ['yellow', 'grey', 'orange'];

function DevCards({ mergeStats, inverted, maxSize, loading }) {
  const isInverted = inverted === undefined;
  const textSize = 'small';

  return (
    <LoadingPenguin loading={loading}>
      {_map(
        mergeStats.slice(0, maxSize || mergeStats.length),
        (mergeStat, place) => (
          <InnerCard key={mergeStat.avatar_url}>
            <InnerHeading>
              <Header
                style={{ color: 'white' }}
                size={textSize}
                inverted={isInverted}
              >
                {place < 3 && <Icon name="trophy" color={colors[place]} />}
                {place >= 3 && <Icon name="meh" />}
                <Header.Content>
                  Score:
                  {mergeStat.data.score.toPrecision(3)}
                </Header.Content>
              </Header>
            </InnerHeading>
            <Segment padded basic>
              <Grid container columns={2} stackable relaxed>
                <Grid.Column>
                  <Container text>
                    <Image
                      size="small"
                      src={mergeStat.avatar_url}
                      style={{
                        borderRadius: '15px',
                        border: '1px solid black',
                      }}
                    />
                  </Container>
                </Grid.Column>
                <Grid.Column verticalAlign="middle" width={8}>
                  <List>
                    <List.Item>
                      <Header
                        style={{ color: '#CCCCCC' }}
                        size={textSize}
                        inverted={isInverted}
                      >
                        <Icon name="thumbs outline up" />
                        <Header.Content>{`Approvals: ${
                          mergeStat.data.approvals || 0
                        }`}</Header.Content>
                      </Header>
                    </List.Item>
                    <List.Item>
                      <Header
                        style={{ color: '#CCCCCC' }}
                        size={textSize}
                        inverted={isInverted}
                      >
                        <Icon name="comment outline" />
                        <Header.Content>
                          {`Comments: ${mergeStat.data.comments || 0}`}{' '}
                        </Header.Content>
                      </Header>
                    </List.Item>
                    <List.Item>
                      <Header
                        style={{ color: '#CCCCCC' }}
                        size={textSize}
                        inverted={isInverted}
                      >
                        <Icon name="file outline" />
                        <Header.Content>{`Authored: ${
                          mergeStat.data.authored || 0
                        }`}</Header.Content>
                      </Header>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid>
            </Segment>
          </InnerCard>
        ),
      )}
    </LoadingPenguin>
  );
}

export default DevCards;
