import React from 'react';
import { Message, Header, Grid, Segment, List, Icon } from 'semantic-ui-react';
import RecentDeployments from '../../containers/recentdeployments';

const PrdLayer = ({ violations, error, active }) => {
  let content = <span />;

  if (!active) {
    content = <Icon name="bell slash" color="red" />;
  }
  if (violations.length) {
    const violationContent = violations.map((violation) => (
      <Message key={violation.name}>
        <a href={violation.link} target="_blank" rel="noopener noreferrer">
          {violation.name}
        </a>
      </Message>
    ));
    violationContent.unshift(<Message size="large">Violations</Message>);
    content = (
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(255, 0, 0, .6)',
        }}
      >
        <img
          alt="warning!"
          id="alertImage"
          src="http://i.imgur.com/JDF8XYW.gif"
          style={{ width: '100%', height: '100%', opacity: 0.3 }}
        />
        <div className="failureText">
          <Grid columns={2} divided>
            <Grid.Column>
              <Segment inverted>
                <Header size="large">Recent Deployments</Header>
              </Segment>
              <Segment attached="bottom">
                <RecentDeployments />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment inverted>
                <Header size="large">Violations</Header>
              </Segment>
              <Segment attached="bottom">
                <List size="massive" relaxed celled>
                  {violations.map((violation) => (
                    <List.Item key={violation.name}>
                      <List.Content>
                        <List.Description>
                          <Header size="large">{violation.name}</Header>
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  } else if (error) {
    content = (
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 0, .6)',
        }}
      />
    );
  }

  return content;
};

export default PrdLayer;
