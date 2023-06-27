import moment from 'moment';
import React from 'react';
import { List, Header, Segment, Grid } from 'semantic-ui-react';
import { get as _get } from 'lodash';

function MergeInfoList({ mergeRequest }) {
  const textColor = '#CCCCCC';
  const needsAttention =
    _get(mergeRequest, 'prediction.Prediction.predictedLabel') === 'bad';
  return (
    <Segment basic>
      <Grid columns={2} relaxed>
        <Grid.Column>
          <Header size="tiny">Merge Info</Header>
          <List relaxed>
            <List.Item>
              <Header
                icon="exchange"
                style={{ color: textColor, fontSize: '10pt' }}
                content={`Changes: ${
                  mergeRequest.changeStats.changeCount || '0'
                }`}
              />
            </List.Item>
            <List.Item>
              <Header
                icon="alarm"
                style={{ color: textColor, fontSize: '10pt' }}
                content={`Urgency: ${mergeRequest.urgency}`}
              />
            </List.Item>
            {needsAttention && (
              <List.Item>
                <Header
                  icon="warning sign"
                  style={{ color: textColor, fontSize: '10pt' }}
                  content="This merge request needs attention"
                />
              </List.Item>
            )}
          </List>
        </Grid.Column>
        <Grid.Column>
          <Header size="tiny">Activity</Header>
          <List vertical relaxed>
            <List.Item>
              <Header
                icon="comment outline"
                style={{ color: textColor, fontSize: '10pt' }}
                content={`${mergeRequest.comments.length || '0'}  (${
                  mergeRequest.yourComments.length
                } You)`}
              />
            </List.Item>
            <List.Item>
              <Header
                icon="thumbs outline up"
                style={{ color: textColor, fontSize: '10pt' }}
                content={mergeRequest.approvers.approved_by.length || '0'}
              />
            </List.Item>
            <List.Item>
              <Header
                icon="calendar"
                style={{ color: textColor, fontSize: '10pt' }}
                content={moment(mergeRequest.lastChange)
                  .startOf('minutes')
                  .fromNow()}
              />
            </List.Item>
          </List>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default MergeInfoList;
