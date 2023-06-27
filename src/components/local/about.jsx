/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import {
  Container,
  Header,
  Accordion,
  Icon,
  List,
  Segment,
} from 'semantic-ui-react';
import './about.css';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  handleTitleClick(e, itemProps) {
    const { index } = itemProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const items = [
      {
        title: 'What is Penguin Alarm?',
        key: 'whatis',
        content: {
          content: (
            <span>
              <p>
                Penguin alarm helps your team get the most out of systems like
                new relic and GitLab. Your team will always know what needs
                their attention, and maybe have a little fun while they are at
                it.
              </p>
              <Header size="small" inverted>
                Uh, why so many penguins?
              </Header>
              <p>
                When our team first got a TV ("information radiator" or "wall
                monitor" if you want to be fancy), some team members put up live
                streams of penguins because they were fun. When their stuffy
                squad lead insisted that they not waste valuable real-estate on
                things that didn't provide business value, a compromise was
                forged. With a simple polling of the new relic API, we could
                turn the whole screen red if any violations were found. We
                started calling that view on the TV "Penguin Alarm" and the name
                stuck. It's grown a lot since then, but the penguins have
                stayed.
              </p>
            </span>
          ),
        },
      },
      {
        title: 'Getting Started',
        key: 'started',
        content: {
          content: (
            <Container>
              Its easy to get started. The bottom menu has a{' '}
              <Icon name="configure" /> button that will let you enter your
              team's settings. Nothing other than a team name is required, but
              the more you configure, the more useful the system is.
              <Header size="small" inverted>
                GitLab setup
              </Header>
              <p>
                Once you've entered a team name, you can enter any number of
                GitLab groups you'd like to monitor. Because GitLab's
                deployments api works a little differently, if you want to take
                advantage of deployment tracking, you'll have to add{' '}
                <b>sa_gitlab_morchsquad@cimpress.com</b> as a reporter in your
                GitLab group. I think this is the account which runs the penguin
                server, so whatever account is running that
              </p>
              <Header size="small" inverted>
                New Relic setup
              </Header>
              <p>
                To take advantage of Penguin Alarm's alerting mechanisms, you'll
                have to set a New Relic policy in your configuration. In order
                to do so, Penguin alarm will need to know your New Relic API
                key. If you haven't done so already, visit your user page (
                <Icon name="user" />) to enter the API key. Then you will be
                able to search for your policy name in the configuration screen.
              </p>
              <Header size="small" inverted>
                TV Mode setup
              </Header>
              <p>
                Put in as many youtube streams as you like (note: do not use the
                full URL, just the identifier in the querystring). When in TV
                mode, these streams will rotate on your TV. If all is well,
                you'll see a lot of them.
              </p>
              <p>
                Choose if you want to always show the leaderboard for best code
                reviewer. If you want to see an unfettered view of your youtube
                streams at all times, you won't want to enable this. However, if
                your team has a friendly rivalry for best reviewer, they may
                want their name on the TV.
              </p>
            </Container>
          ),
        },
      },
      {
        title: 'How Can I Contribute?',
        key: 'contribute',
        content: {
          content: (
            <Container>
              We'd love to have others contribute to the project, even if it's
              just providing an idea.
              <List inverted bulleted>
                <List.Item>
                  <a
                    href="https://gitlab.com/Cimpress-Technology/FI/developer-tools/penguin-alarm/-/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Record an issue
                  </a>
                </List.Item>
                <List.Item>
                  <a
                    href="https://gitlab.com/Cimpress-Technology/FI/developer-tools/penguin-alarm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source for the UI
                  </a>
                </List.Item>
                <List.Item>
                  <a
                    href="https://gitlab.com/Cimpress-Technology/FI/developer-tools/penguin-server"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source for the server
                  </a>
                </List.Item>
              </List>
            </Container>
          ),
        },
      },
      {
        title: 'Tracking Open Merge Requests',
        key: 'tracking',
        content: {
          content: (
            <p>
              GitLab doesn't do the best job telling you what merge requests are
              open for your review. Penguin Alarm prominently displays what
              merge requests need approval and which have been approved but not
              merged. You can also personalize your view by visiting your user
              page (
              <Icon name="user" />) and entering your GitLab username. Penguin
              Alarm will use this to tell you what merge requests need your
              attention.
            </p>
          ),
        },
      },
      {
        title: 'Team Statistics',
        key: 'stats',
        content: {
          content: (
            <Container>
              <p>
                Chances are, your team loves writing code, but they may need
                some motivation to do effective code reviews. Penguin Alarm
                shows your team relevant statistics to ensure they know how
                thoroughly they are reviewing code.
              </p>

              <Header size="small" inverted>
                List of Statistics
              </Header>
              <List inverted bulleted>
                <List.Item>
                  <b>Comment rate</b> - how many comments your team makes per
                  merge request
                </List.Item>
                <List.Item>
                  <b>Merge rate</b> - how many merge requests your team finishes
                  a day
                </List.Item>
                <List.Item>
                  <b>Merge time</b> - the number of hours it takes to finish a
                  merge request
                </List.Item>
                <List.Item>
                  <b>Approval time</b> - the number of hours it takes to approve
                  a merge request
                </List.Item>
              </List>

              <Header size="small" inverted>
                <Icon name="line graph" />
                Graphs
              </Header>
              <p>
                The graph menu includes graphs for many elements of the team's
                performance that let you see trends over the previous four
                weeks.
              </p>
            </Container>
          ),
        },
      },
      {
        title: 'Gamification',
        content: {
          key: 'gamification',
          content: (
            <Container>
              <Header size="small" inverted>
                Developer Stats
              </Header>
              <p>
                We all do better with a little competition. Penguin Alarm scores
                your code review engagement using the formula:
                <Segment
                  style={{
                    background: 'rgba(0, 0, 0, .3)',
                    marginTop: '15px',
                    marginRight: '20px',
                    fontFamily: 'Courier New',
                    fontSize: '10pt',
                    fontWeight: 'bold',
                    padding: '20px',
                  }}
                >
                  50 * ((% of your team's comments) + (% of your team's
                  approvals)) / (Merge requests you could have reviewed)
                </Segment>
              </p>
              <Header size="small" inverted>
                <Icon name="trophy" />
                Achievements
              </Header>
              <p>
                The system includes a set of achievements that can encourage and
                amuse your team.
              </p>
            </Container>
          ),
        },
      },
      {
        title: 'Deployment Tracking',
        key: 'deployment',
        content: {
          content: (
            <Container>
              <Header size="small" inverted>
                Recent
              </Header>
              <p>
                Penguin Alarm displays the most recent deployments to help you
                keep track of your latest state in production. When New Relic
                alerts, the latest deployments can be very helpful to get you on
                the right start.
              </p>

              <Header size="small" inverted>
                By System
              </Header>
              <p>
                Keeps track of all the latest deployments to each system, and
                displays an alert when your integration environment is ahead of
                your production environment so you don't forget that last
                (sometimes) manual step.
              </p>

              <Header size="small" inverted>
                Timeline
              </Header>
              <p>
                Found in the graphs menu, you can see the last two weeks of
                deployments in an easy-to-grok timeline view.
              </p>
            </Container>
          ),
        },
      },
      {
        title: 'TV Mode',
        key: 'tv',
        content: {
          content: (
            <Container>
              <Icon name="tv" />
              If your team has a TV, Penguin Alarm includes a UI that is
              customized to work for such a use case. With youtube videos as the
              background, your team will pay attention and be engaged with the
              information penguin alarm provides.
            </Container>
          ),
        },
      },
      {
        title: 'Alerting',
        key: 'alerting',
        content: {
          content: (
            <Container>
              If you've configured one or more New Relic policies, you'll
              receive alerts in both local and TV mode when that policy has any
              open violations, with those violations prominently listed. It will
              be hard to miss any violations when your TV starts to flash red
              alerts, and you can respond quickly to fix any problems.
            </Container>
          ),
        },
      },
    ];

    return (
      <Container
        text
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, 0))',
          padding: '20px',
          paddingRight: '35px',
          height: '100vh',
          borderLeft: '2px solid black',
          borderRight: '2px solid black',
          lineHeight: '1.8',
        }}
      >
        <Accordion
          inverted
          activeIndex={activeIndex}
          panels={items}
          onTitleClick={this.handleTitleClick.bind(this)}
        />
      </Container>
    );
  }
}
