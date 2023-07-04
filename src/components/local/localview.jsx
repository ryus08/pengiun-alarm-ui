/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, Icon, Transition, Container } from 'semantic-ui-react';
import { withAuth } from 'react-oidc-context';
import Local from './local';
import GraphView from './graphview';
import About from './about';
import Achievements from '../../containers/achievements';
import SickMergeRequests from '../../containers/sickmergerequests';
import Configuration from './configuration';
import userSettings from '../../usersettings';
import UserPreferences from '../../containers/config/userpreferences';

const handleTvLink = () => {
  window.open(userSettings.addParams({ tv: 'true' }), '_blank');
};
class LocalView extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: this.props.startPage };
  }

  handleItemClick(e, { name }) {
    this.setState({ visible: name });
  }

  render() {
    const { auth } = this.props;
    const topColor = `${this.props.topColor.r}, ${this.props.topColor.g}, ${this.props.topColor.b}`;
    const bottomColor = `${this.props.bottomColor.r}, ${this.props.bottomColor.g}, ${this.props.bottomColor.b}`;
    const bgImage = `background-image: url('penguin.png'), linear-gradient(rgb(${topColor}) 25%, rgb(${bottomColor}))`;
    const transitionType = 'fade';
    return (
      <Container fluid>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Penguin Alarm</title>
          <style>{`body.penguin { ${bgImage} }`}</style>
        </Helmet>
        <Transition
          visible={this.state.visible === 'config'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <Configuration visible={this.state.visible === 'config'} />
          </div>
        </Transition>
        <Transition
          visible={this.state.visible === 'home'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <Local
              showSelf={this.props.showSelf}
              visible={this.state.visible === 'home'}
            />
          </div>
        </Transition>
        <Transition
          visible={this.state.visible === 'graphs'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <GraphView visible={this.state.visible === 'graphs'} />
          </div>
        </Transition>
        <Transition
          visible={this.state.visible === 'achievements'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <Achievements visible={this.state.visible === 'achievements'} />
          </div>
        </Transition>
        <Transition
          visible={this.state.visible === 'user'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <UserPreferences visible={this.state.visible === 'user'} />
          </div>
        </Transition>
        <Transition
          visible={this.state.visible === 'about'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <About visible={this.state.visible === 'about'} />
          </div>
        </Transition>
        <Transition
          visible={this.state.visible === 'sickmr'}
          animation={transitionType}
          duration={500}
        >
          <div>
            <SickMergeRequests visible={this.state.visible === 'sickmr'} />
          </div>
        </Transition>

        <Menu
          fixed="bottom"
          inverted
          style={{
            background: `linear-gradient(to right, rgba(${topColor}, 0.3), rgba(${topColor}, 0) 30%)`,
          }}
        >
          <Menu.Item
            {...(this.props.noConfig ? { disabled: true } : {})}
            name="home"
            active={this.state.visible === 'home'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon name="home" />
          </Menu.Item>
          <Menu.Item
            name="config"
            active={this.state.visible === 'config'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon name="configure" />
          </Menu.Item>
          <Menu.Item
            {...(this.props.noConfig ? { disabled: true } : {})}
            name="graphs"
            active={this.state.visible === 'graphs'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon name="line graph" />
          </Menu.Item>
          <Menu.Item
            {...(this.props.noConfig ? { disabled: true } : {})}
            name="achievements"
            active={this.state.visible === 'achievements'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon
              name="trophy"
              {...(this.props.newAward ? { color: 'yellow' } : {})}
            />
          </Menu.Item>
          <Menu.Item
            {...(this.props.noConfig ? { disabled: true } : {})}
            name="tv"
            onClick={handleTvLink}
          >
            <Icon name="tv" />
          </Menu.Item>
          <Menu.Item
            name="user"
            active={this.state.visible === 'user'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon name="user" />
          </Menu.Item>
          <Menu.Item
            name="about"
            active={this.state.visible === 'about'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon name="info" />
          </Menu.Item>
          <Menu.Item
            name="sickmr"
            active={this.state.visible === 'sickmr'}
            onClick={this.handleItemClick.bind(this)}
          >
            <Icon name="legal" />
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={false}
            onClick={() => {
              auth.removeUser();
            }}
          >
            <Icon name="sign out" />
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
}

export default withAuth(LocalView);
