import React, { Component } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Segment, Select } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map as _map, find as _find } from 'lodash';

class MultiTile extends Component {
  constructor(props) {
    const { options } = props;
    super(props);
    this.state = {
      selected: options[0],
    };
  }

  // change({ value }) {
  //   const { options } = this.props;
  //   this.setState({
  //     selected: _find(options, (option) => option.value === value),
  //   });
  // }

  render() {
    const { options, shadeColor } = this.props;
    const { selected } = this.state;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const opts = _map(options, (opt) => ({
      value: opt.value,
      text: opt.text,
    }));
    return (
      <Segment.Group
        style={{
          backgroundColor: shadeColor || 'rgba(0, 0, 0, .25)',
          marginTop: '30px',
          borderRadius: '20px',
          border: '1px solid #111111',
        }}
      >
        <Segment
          inverted
          textAlign="left"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '15px 15px 0px 0px',
          }}
        >
          {/* <Select
            defaultValue={selected.value}
            options={opts}
            style={{
              backgroundColor: 'rgba(0, 0, 0, .2)',
              color: 'white',
              border: '1px solid gray',
              fontSize: '12pt',
            }}
            onChange={(event, data) => this.change(data)}
          /> */}
        </Segment>
        <Segment
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderRadius: '0px 0px 15px 15px',
          }}
        >
          {selected.content}
        </Segment>
      </Segment.Group>
    );
  }
}

export default MultiTile;
