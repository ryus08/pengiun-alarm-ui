import React, { Component } from 'react';
import { findIndex as _findIndex } from 'lodash';
import { Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import Tile from './tile';

class UserStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: props.monthActivity[28],
    };
  }

  onChange(date) {
    const { monthActivity } = this.props;
    const selectedDayIdx = _findIndex(
      monthActivity,
      (activity) => activity.date.toDateString() === date.toDateString(),
    );
    this.setState({
      activity:
        selectedDayIdx === -1
          ? { comments: 'N/A', merges: 'N/A', approvals: 'N/A' }
          : monthActivity[selectedDayIdx],
    });
  }

  render() {
    const { monthActivity } = this.props;
    const { activity } = this.state;
    return (
      <Tile name="Last Month's Stats">
        <div>
          <td width="50%">
            <Calendar
              onChange={(date) => this.onChange(date)}
              activeStartDate={new Date(monthActivity[28].date)}
              maxDate={new Date(monthActivity[28].date)}
              minDate={new Date(monthActivity[0].date)}
            />
          </td>
          <td width="50%">
            <Header inverted size="small" textAlign="center">
              Comments: {activity.comments}
            </Header>
            <Header inverted size="small" textAlign="center">
              Approvals: {activity.approvals}
            </Header>
            <Header inverted size="small" textAlign="center">
              Merges: {activity.merges}
            </Header>
          </td>
        </div>
      </Tile>
    );
  }
}
export default UserStats;
