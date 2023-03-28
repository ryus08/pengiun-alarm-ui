// jshint ignore: start
import React from 'react';
import { List, Icon, Popup } from 'semantic-ui-react';
import MergeInfoList from './mergeinfolist';
import MergeApproved from './mergeapproved';
import MergeCommented from './mergecommented';

function MergeState({ mergeRequest }) {
  const needsAttention =
    mergeRequest.prediction.Prediction.predictedLabel === 'bad';
  return (
    <List relaxed>
      <List.Item>
        <Popup
          inverted
          style={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}
          hoverable
          flowing
          position="left center"
          trigger={
            <Icon
              inverted
              name={needsAttention ? 'warning sign' : 'info circle'}
              color={needsAttention ? 'yellow' : 'green'}
            />
          }
        >
          <Popup.Content>
            <MergeInfoList mergeRequest={mergeRequest} />
          </Popup.Content>
        </Popup>
      </List.Item>
      <List.Item>
        <MergeCommented mergeRequest={mergeRequest} />
      </List.Item>
      <List.Item>
        <MergeApproved mergeRequest={mergeRequest} />
      </List.Item>
      {mergeRequest.youCanMerge && (
        <List.Item>
          <Icon inverted name="code branch" color="yellow" />
        </List.Item>
      )}
    </List>
  );
}

export default MergeState;
