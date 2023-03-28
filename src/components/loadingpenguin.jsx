// jshint ignore: start
import React from 'react';
import { Loader, Image, Segment } from 'semantic-ui-react';

const LoadingPenguin = ({ loading, children }) => {
  const loader = (
    <Segment basic>
      <Loader active inline>
        <Image src="Sleep.png" size="tiny" />
      </Loader>
    </Segment>
  );

  return loading ? loader : children;
};

export default LoadingPenguin;
