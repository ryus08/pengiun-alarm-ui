import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

function MergeApproved({ mergeRequest }) {
  if (!mergeRequest.userApproved) {
    return <span />;
  }
  const icon = (
    <Icon
      inverted
      name="thumbs up outline"
      color={mergeRequest.updates.sinceApproval ? 'yellow' : 'white'}
    />
  );

  const message = mergeRequest.updates.sinceApproval
    ? 'There have been changes made since your approval'
    : 'You have approved this merge request';

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

export default MergeApproved;
