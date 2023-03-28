import React, { Component } from 'react';
import { Label, Container } from 'semantic-ui-react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import {
  map as _map,
  uniq as _uniq,
  forEach as _forEach,
  sortBy as _sortBy,
} from 'lodash';
import randomColor from 'randomcolor';
import './vis.css';

class DeploymentTimeline extends Component {
  constructor() {
    super();
    const end = moment();
    const start = moment().subtract(24, 'hour');
    this.state = {
      start,
      end,
    };
    // things don't work well if we respect the first call back to to the range
    // change handler
    this.changed = false;
    this.colors = {};
  }

  setColors() {
    const { history } = this.props;
    const environments = _uniq(_map(history, 'environment'));

    _forEach(environments, (environment) => {
      if (!this.colors[environment]) {
        this.colors[environment] = randomColor({ luminosity: 'light' });
      }
    });
  }

  rangechangedHandler(data) {
    if (this.changed) {
      this.setState({
        start: moment(data.start),
        end: moment(data.end),
      });
    } else {
      this.changed = true;
    }
  }

  groups() {
    const { history } = this.props;
    const names = _uniq(_map(history, 'name'));

    let groups = _map(names, (name) => ({
      id: name,
      content: name,
    }));

    groups = _sortBy(groups, 'content');

    let index = 0;
    _forEach(groups, (group) => {
      group.className = index % 2 === 1 ? 'even' : 'odd';
      group.order = index;
      index += 1;
    });

    return groups;
  }

  items() {
    const { history } = this.props;
    return _map(history, (deployment) => ({
      start: deployment.date,
      group: deployment.name,
      title: `<image src=${deployment.user.avatar_url} width='100px'/>`,
      style: `background-color: ${
        this.colors[deployment.environment]
      }; border-color: ${this.colors[deployment.environment]};`,
    }));
  }

  render() {
    const { zoomMin, start, end } = this.state;
    this.setColors();
    const groups = this.groups();
    const items = this.items();

    const options = {
      stack: false,
      zoomMin,
      start,
      end,
    };

    return (
      <Container fluid>
        <Container fluid textAlign="right">
          <Label.Group>
            {_map(this.colors, (value, key) => (
              <Label style={{ backgroundColor: value }}>{key}</Label>
            ))}
          </Label.Group>
        </Container>
        <Timeline
          key="timeline"
          options={options}
          rangechangedHandler={(data) => this.rangechangedHandler(data)}
          items={items}
          groups={groups}
        />
      </Container>
    );
  }
}

export default DeploymentTimeline;
