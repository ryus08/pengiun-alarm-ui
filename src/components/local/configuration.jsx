import React from 'react';
import { Form, Grid, Divider } from 'semantic-ui-react';

import GroupSearch from '../../containers/config/groupsearch';
import NewRelicSearch from '../../containers/config/newrelicsearch';
import ConfigSearch from '../../containers/config/configsearch';
import Slideshow from '../../containers/config/slideshow';
import ConfigActions from '../../containers/config/configactions';
import Tile from './tile';

function Configure() {
  return (
    <Grid centered columns="equal" verticalAlign="top" padded>
      <Grid.Column width={4}>
        <Tile name="Configurations">
          <ConfigSearch />
        </Tile>
      </Grid.Column>
      <Grid.Column width={7}>
        <Tile name="Editing">
          <Form inverted>
            <GroupSearch />
            <NewRelicSearch />
            <Slideshow />
            <Divider />
          </Form>
        </Tile>
        <ConfigActions />
      </Grid.Column>
    </Grid>
  );
}

export default Configure;
