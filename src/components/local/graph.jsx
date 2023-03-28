import React, { Component } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import { map as _map, find as _find } from 'lodash';
import randomColor from 'randomcolor';

class Graph extends Component {
  constructor(props) {
    super(props);
    const { contributors } = props;
    this.state = {
      width: 0,
      selected: undefined,
      colors: _map(contributors, (contrib) => ({
        contrib,
        color: randomColor({ luminosity: 'light' }),
      })),
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => this.updateWindowDimensions());
  }

  handleSelect({ dataKey }) {
    const { selected } = this.state;
    if (selected === dataKey) {
      this.setState({ selected: undefined });
    } else {
      this.setState({ selected: dataKey });
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { props, state } = this;
    return (
      <AreaChart
        width={props.width || state.width - 50}
        height={props.height || 500}
        data={props.data}
        margin={{
          top: 0,
          right: 15,
          left: -20,
          bottom: 0,
        }}
      >
        <Legend
          wrapperStyle={{ color: 'white' }}
          onClick={(e) => this.handleSelect(e)}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" />
        <Tooltip wrapperStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        {_map(props.contributors, (contrib) => {
          let contribColor = _find(
            state.colors,
            (color) => color.contrib === contrib,
          ).color;

          // default opacity
          let opacity = 0.1;
          if (state.selected && state.selected === contrib) {
            opacity = 0.6;
            contribColor = '#FFFFFF';
          }
          return (
            <Area
              key={props.title + contrib}
              fillOpacity={opacity}
              type="monotone"
              dataKey={contrib}
              fill={contribColor}
              stroke={contribColor}
            />
          );
        })}
        <XAxis dataKey="dateIndex" tick={{ fill: 'white' }} />
        <YAxis tick={{ fill: 'white' }} />
      </AreaChart>
    );
  }
}

export default Graph;
