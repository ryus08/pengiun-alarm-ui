// jshint ignore: start
import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

function MergeCommented({ mergeRequest }) {
  if (mergeRequest.yourComments.length === 0 || mergeRequest.userApproved) {
    return <span />;
  }

  const icon = (
    <Icon
      inverted
      name="comment outline"
      color={mergeRequest.updates.sinceComment ? 'yellow' : 'white'}
    />
  );

  const message = mergeRequest.updates.sinceApproval
    ? 'There have been changes made since your last comment'
    : 'You have commented on this merge request';

  return (
    <Popup
      inverted
      style={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}
      hoverable
      flowing
      position="left center"
      trigger={icon}
      content={message}
    />
  );
}

export default MergeCommented;
