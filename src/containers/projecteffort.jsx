import { connect } from 'react-redux';
import {
  map as _map,
  get as _get,
  meanBy as _meanBy,
  sumBy as _sumBy,
} from 'lodash';
import TheComponent from '../components/local/projecteffort';

const mapStateToProps = (state) => {
  const effort = _map(state.effort.effort, (effortRow) => {
    const latestEffort = _get(effortRow, 'latestData.score', 0);
    const totalEffort = _get(effortRow, 'totalData.score', 0);
    const latestComments = _get(effortRow, 'latestData.comments', 0);
    const totalComments = _get(effortRow, 'totalData.comments', 0);
    const latestMerges = _get(effortRow, 'latestData.merges', 0);
    const totalMerges = _get(effortRow, 'totalData.merges', 0);

    return {
      name: effortRow.name,
      latestEffort,
      totalEffort,
      effortChange: latestEffort - totalEffort,
      latestComments,
      totalComments,
      latestMerges,
      totalMerges,
    };
  });

  const analysis =
    effort.length === 0
      ? []
      : [
          {
            name: 'Average Effort',
            value: _meanBy(effort, 'latestEffort'),
          },
          {
            name: 'Median Effort',
            value: effort[Math.floor(effort.length / 2)].totalEffort,
          },
          {
            name: 'Total Comments',
            value: _sumBy(effort, 'totalComments'),
          },
          {
            name: 'Total Merges',
            value: _sumBy(effort, 'totalMerges'),
          },
        ];

  return {
    effort,
    analysis,
  };
};

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
