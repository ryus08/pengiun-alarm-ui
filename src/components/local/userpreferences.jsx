/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Grid, Form, Header } from 'semantic-ui-react';
import { map as _map } from 'lodash';
import { DelayInput } from 'react-delay-input';
import { ChromePicker } from 'react-color';
import Tile from './tile';
import UserStats from './userstats';

function UserPreferences({
  gitLabUsername,
  nrApiKey,
  achievements,
  activity,
  topColor,
  monthActivity,
  bottomColor,
  update,
  gitProvider,
}) {
  const changeGitLabUsername = (event) => {
    update({
      gitLabUsername: event.target.value,
      nrApiKey,
      topColor,
      bottomColor,
      gitProvider,
    });
  };

  const changeNrApiKey = (event) => {
    update({
      nrApiKey: event.target.value,
      gitLabUsername,
      topColor,
      bottomColor,
      gitProvider,
    });
  };

  const changeTopColor = (color) => {
    update({
      nrApiKey,
      gitLabUsername,
      topColor: color.rgb,
      bottomColor,
      gitProvider,
    });
  };

  const changeBottomColor = (color) => {
    update({
      nrApiKey,
      gitLabUsername,
      topColor,
      bottomColor: color.rgb,
      gitProvider,
    });
  };

  return (
    <Grid centered columns="equal" verticalAlign="middle" padded>
      <Grid.Column width={6}>
        <Form inverted>
          <Form.Field>
            <label>GitLab username</label>
            <DelayInput
              minLength={2}
              delayTimeout={1000}
              value={gitLabUsername}
              onChange={changeGitLabUsername}
            />
          </Form.Field>

          <Form.Field>
            <label>New Relic API Key</label>
            <DelayInput
              minLength={2}
              delayTimeout={1000}
              value={nrApiKey}
              onChange={changeNrApiKey}
            />
          </Form.Field>
        </Form>
        <UserStats activity={activity} monthActivity={monthActivity} />
        <Tile name="Today's Achievements">
          {_map(achievements, (achievement) => (
            <Header inverted size="small" key={achievement.name}>
              {achievement.name}
            </Header>
          ))}
        </Tile>
        <Tile name="Styling">
          <Grid textAlign="center" centered padded>
            <Grid.Column width={6}>
              <Header inverted size="small">
                Top Color
              </Header>
              <ChromePicker
                color={topColor}
                onChangeComplete={changeTopColor}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header inverted size="small">
                Bottom Color
              </Header>
              <ChromePicker
                color={bottomColor}
                onChangeComplete={changeBottomColor}
              />
            </Grid.Column>
          </Grid>
        </Tile>
      </Grid.Column>
    </Grid>
  );
}

export default UserPreferences;
